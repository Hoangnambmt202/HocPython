/* eslint-disable react/prop-types */

const AddForm = ({ title,onClose, onSubmit, children }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(); // Gọi hàm onSubmit từ props
  };
  const handleCancel = (e) => {
    e.preventDefault();
    onClose();
    ; // Gọi hàm onCancel từ props
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50" style={{marginTop: 0}}>
      <div className="p-6 bg-white rounded-lg shadow-md min-w-96">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {children} {/* Render các thành phần con bên trong form */}

          <div className="flex justify-end space-x-6">
          <button onClick={handleCancel} >
            Hủy
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Thêm
          </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default AddForm;