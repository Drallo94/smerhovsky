/*
Default gulpfile
=======
- with Babel using next-generation JavaScript (https://babeljs.io/)
- node.js (v.12+) required (https://nodejs.org/en/)
*/

/* Import modulů */
import gulp from "gulp"; // https://gulpjs.com/
import del from "del"; // mazání souborů a složek
import notify from "gulp-notify"; // notifikace
import rename from "gulp-rename";
import vinylSourceStream from "vinyl-source-stream"; // vytváření souborů

/* Vývojové moduly */
import browserSync from "browser-sync";
import plumber from "gulp-plumber"; // zachytávání chyb kompilace
import sourcemaps from "gulp-sourcemaps";

/* HTML moduly */
import twig from "gulp-twig";

/* CSS moduly */
import gulpSass from 'gulp-sass'
import nodeSass from 'node-sass'
const sass = gulpSass(nodeSass);
import sassGlob from "gulp-sass-glob";
import autoprefixer from "gulp-autoprefixer";
import cleanCSS from 'gulp-clean-css'

/* Javascript moduly */
import rollup from "rollup";
import gulpRollup from "gulp-better-rollup";
import rollupBabel from "@rollup/plugin-babel";
import rollupCommonjs from "@rollup/plugin-commonjs";
import rollupJson from "@rollup/plugin-json";
import rollupNodeResolve from "@rollup/plugin-node-resolve";
import replace from '@rollup/plugin-replace';
import terser from "gulp-terser"; // minifikace js

/* SVG a img moduly */
// import imagemin from "gulp-imagemin";
import svgSprite from "gulp-svg-sprite";
import gulpFavicons from "gulp-favicons";

/* Nastavení */
const config = {
  buildstamp: true,
  notifyErrors: true,
  browserSync: {
    open: true,
    ghostMode: false
  },
  cleanCSS: {
    default: {
      format: 'beautify',
      level: 2
    },
    minified: {
      level: 2
    }
  }
};

/* Adrešářová struktura */
const paths = {
  src: "src",
  dest: "build",
};

/* Cesta ke zdrojům - neměnit! */
const sources = {
  styles: {
    watch: `${paths.src}/styles/**/*.scss`,
    src: [`${paths.src}/styles/style.scss`, `${paths.src}/styles/print.scss`],
    dest: `${paths.dest}/css/`,
  },
  scripts: {
    watch: `${paths.src}/scripts/**/*.js`,
    src: `${paths.src}/scripts/scripts.js`,
    dest: `${paths.dest}/js/`,
    rollup: {
      format: "iife",
      external: ["jquery"],
      globals: {
        jquery: "jQuery",
      },
    },
  },
  templates: {
    watch: `${paths.src}/templates/**/*.twig`,
    src: `${paths.src}/templates/*.twig`,
    dest: `${paths.dest}`,
  },
  images: {
    src: `${paths.src}/images/**/*.{JPG,jpg,png,gif,svg}`,
    dest: `${paths.dest}/images/`,
  },
  icons: {
    src: `${paths.src}/svgs/**/*.svg`,
    dest: `${paths.dest}/svgs/`,
    render: {
      scss: {
        dest: `../../${paths.src}/styles/base/_icons.scss`,
        template: `${paths.src}/styles/base/_icons-template.scss`,
      },
    },
  },
  favicons: {
    icon: `${paths.src}/config/favicons/master-favicon-512x512.png`,
    dest: `${paths.dest}/favicons/`,
    icoRoot: `${paths.dest}`, // nebo false pro vypnutí
  },
  files: [
    `${paths.src}/fonts/**/*`,
    `${paths.src}/files/**/*`,
    `${paths.src}/config/og/**/*`,
    `${paths.src}/config/manifest/manifest.json`,
  ],
  reload: ['**/*.php', '**/*.twig']
};

/* Build - Templates (twig) */
export const templates = () => {
  return gulp
    .src(sources.templates.src)
    .pipe(twig())
    .pipe(gulp.dest(sources.templates.dest))
    .pipe(browserSync.stream());
};

/* Build - Styles (SCSS) */
export const styles = () => {
  const onError = function (err) {
    if (config.notifyErrors !== true) {
      return gulp.src('.', { allowEmpty: true })
    }

    const file = err.file.replace(/^.*[\\\/]/, '')

    notify.onError({
      title: 'SASS ERROR',
      subtitle: file + ':' + err.line,
      message: err.messageOriginal
    })(err)

    this.emit('end')
  }

  return gulp
    .src(sources.styles.src)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sassGlob())
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(autoprefixer('last 4 versions'))
    .pipe(cleanCSS(config.cleanCSS.default))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(sources.styles.dest))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cleanCSS(config.cleanCSS.minified))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(sources.styles.dest))
    .pipe(browserSync.stream())
}

/*
Build - Scripts (JS)
===
- používáme babel ES6/7 kód který komplilujeme do ES5 (https://babeljs.io/)
- na pluginy používáme rollup, pluginy instalujeme přes npm install, importujeme do daného modulu (https://github.com/rollup/rollup-plugin-babel)
*/

export const scripts = () => {
  const rollupSettings = sources.scripts.rollup;

  const plugins = [
    rollupNodeResolve(),
    rollupBabel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
    }),
    rollupCommonjs(),
    rollupJson(),
    replace({'process.env.NODE_ENV': JSON.stringify('production')})
  ];

  const onError = function (err) {
    if (config.notifyErrors !== true) {
      return gulp.src(".", { allowEmpty: true });
    }

    if (err.id) {
      var file = err.id.replace(/^.*[\\\/]/, "");
      var message = err.Message;
    } else {
      var file = err.watchFiles[0].replace(/^.*[\\\/]/, "");
      var message = err.Message;
    }

    notify.onError({
      title: file,
      message: message,
    })(err);

    this.emit("end");
  };

  return gulp
    .src(sources.scripts.src)
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(
      gulpRollup(
        { rollup, plugins, external: rollupSettings.external },
        { format: rollupSettings.format, globals: rollupSettings.globals }
      )
    )
    .on("error", onError)
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(sources.scripts.dest))
    .pipe(terser())
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(sources.scripts.dest))
    .pipe(browserSync.stream());
};

/* Build - Zkopíruje dané soubory a složky */
export const files = () => {
  return gulp
    .src(sources.files, { allowEmpty: true, base: paths.src })
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream());
};

/* Build - Minifkuje a zkopíruje všechny obrázky */
export const images = () => {
  return gulp
    .src(sources.images.src, { allowEmpty: true })
    // .pipe(
    //   imagemin(
    //     [
    //       imagemin.gifsicle({ interlaced: true }),
    //       imagemin.mozjpeg({ progressive: true }),
    //       imagemin.optipng({ optimizationLevel: 5 }),
    //       imagemin.svgo({
    //         plugins: [{ removeViewBox: true }, { cleanupIDs: true }],
    //       }),
    //     ],
    //     { verbose: true, silent: false }
    //   )
    // )
    .pipe(gulp.dest(sources.images.dest))
    .pipe(browserSync.stream());
};

/* Dev -  Zkopíruje všechny obrázky */
export const imagesCopy = () => {
  return gulp
    .src(sources.images.src, { allowEmpty: true })
    .pipe(gulp.dest(sources.images.dest))
    .pipe(browserSync.stream());
};

/* Build - Minifikuje svg a vygeneruje svg sprite */
export const icons = () => {
  const svgSpriteConfig = {
    shape: {
      id: {
        separator: ":",
        generator: "icon--%s",
        whitespace: "-",
      },
      transform: ["svgo"],
    },
    mode: {
      symbol: {
        dest: "",
        sprite: "svgs.svg",
        inline: true,
        render: sources.icons.render,
      },
    },
  };

  return gulp
    .src(sources.icons.src, { allowEmpty: true })
    .pipe(svgSprite(svgSpriteConfig))
    .pipe(gulp.dest(sources.icons.dest))
    .pipe(browserSync.stream());
};

/* Build - vygeneruje všechny formáty favicon */
export const faviconsGenerate = () => {
  return gulp
    .src(sources.favicons.icon)
    .pipe(
      gulpFavicons({
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: false,
          coast: false,
          favicons: true,
          firefox: false,
          windows: true,
          yandex: false,
        },
      })
    )
    .pipe(gulp.dest(sources.favicons.dest));
};

/* Build - Přesune favicon.ico do root folderu kvůli robotům a fallbacku */
export const faviconsRootIco = () => {
  if (sources.favicons.icoRoot == false) {
    return gulp.src(".", { allowEmpty: true });
  }

  return gulp
    .src(paths.dest + "/favicons/favicon.ico")
    .pipe(gulp.dest(sources.favicons.icoRoot));
};

// Helper - Smazání dest složky
export const clean = () => del(paths.dest);

// Helper - Vygenerování buildstamp souboru kvůli cachovaní
export const buildstamp = () => {
  if (config.buildstamp !== true) {
    return gulp.src(".", { allowEmpty: true });
  }

  var file = vinylSourceStream("buildstamp.txt");
  var stamp = new Date().getTime().toString();

  file.end(stamp);
  return file.pipe(gulp.dest(paths.dest));
};

// Helper - notifikace po dokončení buildu
export const buildNotify = () => {
  return gulp.src(".", { allowEmpty: true }).pipe(notify("Build dokončen."));
};

// Helper - reload prohlížeče přes BrowserSync
export const reload = () => {
  browserSync.reload();
};

// BrowserSync server, watch tasky
export const devWatch = () => {
  const browserSyncDefault = {
    server: {
      baseDir: paths.dest,
    },
    open: true,
    ghostMode: true,
  };

  browserSync.init(Object.assign(browserSyncDefault, config.browserSync));

  gulp.watch(sources.styles.watch, styles);
  gulp.watch(sources.scripts.watch, scripts);
  gulp.watch(sources.templates.watch, templates);
  gulp.watch(sources.images.src, images);
  gulp.watch(sources.icons.src, icons);
  gulp.watch(sources.files, files);

  if (sources.reload) {
    gulp.watch(sources.reload).on("change", reload);
  }
};

// Task - ($ gulp favicons) - generate favicons and move .ico favicon to root
export const favicons = gulp.series(faviconsGenerate, faviconsRootIco);

// Task - ($ gulp dev) - watch + dev build
export const dev = gulp.series(
  clean,
  icons,
  favicons,
  gulp.parallel(styles, scripts, templates, imagesCopy, files, buildstamp),
  devWatch
);

// Task - ($ gulp dev_images) - watch + dev build
export const dev_images = gulp.series(
  clean,
  icons,
  favicons,
  gulp.parallel(styles, scripts, templates, images, files, buildstamp),
  devWatch
);

// Task - ($ gulp build) - minifikovaný build
export const build = gulp.series(
  clean,
  icons,
  favicons,
  gulp.parallel(styles, scripts, templates, images, files, buildstamp),
  buildNotify
)

// Task - ($ gulp) - defaultní gulp task
export default dev;
