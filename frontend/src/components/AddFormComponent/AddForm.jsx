/* eslint-disable react/prop-types */

const AddForm = ({ title, onClose, onSubmit, children }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(); // Truyền dữ liệu form lên parent
  };
  
  return (
    <div className="fixed !mt-0 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="p-6 bg-white rounded-lg shadow-md min-w-96 max-h-screen overflow-y-auto scrollbar-hide">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <form onSubmit={handleSubmit} className="space-y-4 ">
          {children} {/* Render các thành phần con bên trong form */}
          <div className="flex justify-end space-x-6">
            <button type="button" onClick={onClose}>Hủy</button>
            <button  type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Thêm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddForm;