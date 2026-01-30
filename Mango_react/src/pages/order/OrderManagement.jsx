import React from 'react'
import OrderTable from '../../components/menuItem/MenuItemsTable'
import { useGetOrdersQuery,useUpdateOrderMutation } from '../../store/api/orderApi';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
function OrderManagement() {

 const [updateOrder] = useUpdateOrderMutation();
   const [showModal, setShowModal] = useState(false);
   const handleCloseModal = () => {setShowModal(false);
    setSelectedOrder(null);
   }
      const handleEditOrder = (order) => {
        setShowModal(true);
    setSelectedOrder(order);
   }
   const handleShowModal = () => {
  setFormData({
    name: "",
    description: "",
    category: "",
    price: "",
    specialTag: "",
    image: null,
  });
  setShowModal(true);
};

   const [isSubmitting, setIsSubmitting] = useState(false);
   const [selectedOrder, setSelectedOrder] = useState(null);


  const handleEditMenuItem = async (item) => {
    setSelectedMenuItem(item);
    setShowModal(true);
    setFormData({
        name: item.name || '',
        description: item.description || '',
        category: item.category || '',
        price: item.price || '',
        specialTag: item.specialTag || '',
        image: null,
    });
};

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
try{
  
let result;

  result = await createMenuItem(formDataToSend).unwrap();
   if(result.success !== false){
    toast.success("Menu item created successfully");
    refetch();
    }
    else{
    toast.error("Failed to create menu item");
    }


    setShowModal(false);
resetForm();
    // optional: reset form
    
}
catch(error){
console.log(error);
}
finally{
    
    setIsSubmitting(false);
}}
  return (
     <div className="container-fluid p-4 mx-3">
      <div className="row mb-4">
        <div className="col">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2>Menu Item Management</h2>
              <p className="text-muted mb-0">
                Manage your restaurant's menu items
              </p>
            </div>
            <button className="btn btn-primary" onClick={handleAddMenuItem}>
              <i className="bi bi-plus-circle me-2"></i>
              Add Menu Item
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-body"> <MenuItemsTable menuItems={menuItems} isLoading={isLoading} error={error} refetch={refetch} onDelete={handleDeleteMenuItem} onEdit={handleEditMenuItem} /></div>
          </div>
        </div>
      </div>
     {showModal && <MenuItemModal formData={formData} onSubmit={handleFormSubmit} onClose={handleCloseModal} isSubmitting={isSubmitting} onChange={handleInputChange} isEditing = {selectedMenuItem !== null} />}
    </div>
  )
}

export default OrderManagement