const initParams = {
  noneditable_editable_class: "mceNoneEditable",
  editable_editable_class: "mceEditable",
  cache_suffix: "?v=5.6.2",
  theme_url:
    "https://img.juexiaotime.com/app/CDN/tinymce/themes/silver/theme.min.js",
  icons_url:
    "https://img.juexiaotime.com/app/CDN/tinymce/icons/default/icons.min.js",
  icons: "default",
  content_css: [
    "https://img.juexiaotime.com/app/CDN/tinymce/skins/content/default/content.min.css",
  ],
  language_url: "https://img.juexiaotime.com/app/CDN/tinymce/langs/zh_CN.js",
  language: "zh_CN",
  skin_url: "https://img.juexiaotime.com/app/CDN/tinymce/skins/ui/oxide",
  content_css_cors: true,
  menubar: false,
  min_height: 450,
  max_height: 600,
  width: "100%",
  autoresize_bottom_margin: 0,
  max_width: "100%",
  contextmenu: "link inserttable | cell row column deletetable",
  quickbars_insert_toolbar: "quicktable",
  draggable_modal: true,
  plugins:
    "noneditable emoticons code  wordcount  preview searchreplace autolink  fullscreen link  table charmap hr pagebreak nonbreaking  advlist lists formatpainter powerpaste autoresize",
  toolbar_groups: {
    formatting: {
      text: "文字格式",
      tooltip: "Formatting",
      // insertblank
      items:
        "bold italic underline  | lineheight | ltr rtl | superscript subscript ",
    },
    alignment: {
      icon: "align-left",
      tooltip: "alignment",
      items: "alignleft aligncenter alignright alignjustify",
    },
  },
  // insertblank
  toolbar:
    " formatselect fontselect fontsizeselect formatting  forecolor backcolor  strikethrough  alignment outdent indent bullist numlist  kityformula-editor blockquote  removeformat formatpainter table link charmap emoticons  hr pagebreak  clearhtml code    undo redo  wordcount searchreplace fullscreen preview",
  table_style_by_css: true,
  cfyun_toolbar_sticky: false,
  toolbar_sticky_wrap: ".main",
  // autosave_ask_before_unload: true, // 当关闭或跳转URL时，弹出提示框提醒用户仍未保存变更内容
  branding: false,
  table_default_attributes: {
    border: "1",
    // cellspacing: '0',
    // cellpadding: '5',
    style:
      "border: 1px solid #ccc; width: 100%; border-collapse: collapse; padding: 5px;",
  },
  table_default_styles: {
    width: "100%",
    height: "100%",
    borderCollapse: "collapse",
    border: "1px solid #ccc",
  },
  table_toolbar:
    "tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol | tablealignleft tablealigncenter tablealignright | tableprops tabledelete",
  powerpaste_word_import: "merge", // 是否保留word粘贴样式  clean | merge
  powerpaste_html_import: "merge", // propmt, merge, clean
  powerpaste_allow_local_images: true, //
  powerpaste_keep_unsupported_src: true,
  paste_data_images: true,
  paste_as_text: false,
  toolbar_sticky: false,
  autosave_ask_before_unload: false,
  fontsize_formats: "12px 14px 16px 18px 24px 36px 48px 56px 72px",
  lineheight_val: "1 1.4 1.5 1.6 1.75 1.8 2 3",
  font_formats:
    "微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats;",
  images_upload_base_path: "",
  placeholder: "请输入内容",
  ax_wordlimit_num: 10000,
  // insertblank
  quickbars_selection_toolbar:
    "bold italic underline  | link h2 h3 blockquote | forecolor backcolor  | alignleft aligncenter alignright alignjustify",
  file_picker_types: "file image media",
  mathjax: {
    lib: "https://img.juexiaotime.com/app/CDN/tinymce/mathjax/tex-mml-chtml.js", //required path to mathjax
    // lib: "https://cdn.jsdelivr.net/npm/mathjax@3.0.5/es5/tex-mml-chtml.js", //required path to mathjax
    symbols: {
      start: "\\(",
      end: "\\)",
    }, //optional: mathjax symbols
    className: "math-tex", //optional: mathjax element class
    configUrl: "https://img.juexiaotime.com/app/CDN/tinymce/mathjax/config.js", //optional: mathjax config js
  },
};

export { initParams };
