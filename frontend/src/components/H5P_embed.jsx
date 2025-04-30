
const H5PEmbed = () => {
  const embedCode = `
    <iframe 
      src="https://hocpython.infinityfreeapp.com/wp-admin/admin-ajax.php?action=h5p_embed&id=2"
      width="762" 
      height="490" 
      frameborder="0" 
      allowfullscreen="allowfullscreen"
      title="Comment trong Python"
    ></iframe>
    <script src="https://hocpython.infinityfreeapp.com/wp-content/plugins/h5p/h5p-php-library/js/h5p-resizer.js" charset="UTF-8"></script>
  `;

  return (
    <div
      dangerouslySetInnerHTML={{ __html: embedCode }}
    />
  );
};

export default H5PEmbed;
