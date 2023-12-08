import React, { useEffect, useRef } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';

// import Image from '@ckeditor/ckeditor5-image/src/image';
// import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
// import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
// import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
// import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
// import LinkImage from '@ckeditor/ckeditor5-link/src/linkimage';
// import ImageInsert from '@ckeditor/ckeditor5-image/src/imageinsert';

ClassicEditor
  .create(document.querySelector('#editor'), {
    // plugins: [ CKFinder],
    // image: {
    //     toolbar: [
    //         'imageStyle:block',
    //         'imageStyle:side',
    //         '|',
    //         'toggleImageCaption',
    //         'imageTextAlternative',
    //         'uploadImage'
    //         // 'linkImage'
    //     ]
    // }
    toolbar: ['uploadImage'],
  })
  .config.module
  .rule('ckeditor5-svg')
  .test(/ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/)
  .use('raw-loader')
  .loader('raw-loader');

function Editor({ onChange, editorLoaded, name, value }) {
  //   const editorRef = useRef();
  //   const { CKEditor, ClassicEditor } = editorRef.current || {};

  //   useEffect(() => {
  //     editorRef.current = {
  //       CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
  //       ClassicEditor: require("@ckeditor/ckeditor5-build-classic")
  //     };
  //   }, []);

  return (
    <div>
      {editorLoaded ? (
        <CKEditor
          type=""
          name={name}
          editor={ClassicEditor}
          data={value}
          onChange={(event, editor) => {
            // const data = editor.getData();
            // console.log({ event, editor, data })
            // onChange(data);
          }}
        />
      ) : (
        <div>Editor loading</div>
      )}
    </div>
  );
}

export default Editor;
