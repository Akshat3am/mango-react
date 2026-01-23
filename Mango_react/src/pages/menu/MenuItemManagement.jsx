import React from 'react'
import MenuItemsTable from '../../components/menuItem/MenuItemsTable'

import MenuItemModal from '../../components/menuItem/MenuItemModal';
import { useState } from 'react';
import { useCreateMenuItemMutation ,useGetMenuItemsQuery,useDeleteMenuItemMutation,useUpdateMenuItemMutation} from '../../store/api/menuItemApi';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
function MenuItemManagement() {

    const{data:menuItems=[],isLoading,error,refetch}= useGetMenuItemsQuery();
    const [createMenuItem]= useCreateMenuItemMutation();
    const [deleteMenuItem]= useDeleteMenuItemMutation();
    const [updateMenuItem]= useUpdateMenuItemMutation();
   const [showModal, setShowModal] = useState(false);
   const handleCloseModal = () => setShowModal(false);
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
const resetForm = () => {
    setFormData({
      name: "",
        description: "",
        category: "",
        price: "",
        specialTag: "",
        image: null,
    });
  };
const handleInputChange = (e) => {

    const {name,value,files} = e.target;
    if(name === 'image'){
        setFormData((prevData)=>({
            ...prevData,
            image:files[0]
        }))
       
    }
    else{
    setFormData((prevData)=>({
        ...prevData,
        [name]:value
    }))
   }}
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [selectedMenuItem, setSelectedMenuItem] = useState(null);
   const[formData,setFormData]=useState({
    name:'',
    description:'',
    category:'',
    price:'',
    specialTag:'',
    image:null

  });
  const handleDeleteMenuItem = async (item) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete the menu item "${item.name}"?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
    });
    if(result.isConfirmed) {
        await deleteMenuItem(item.id).unwrap();
    Swal.fire('Deleted!','Menu item has been deleted.','success');
    }
};
  const handleEditMenuItem = async (item) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete the menu item "${item.name}"?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
    });
    if(result.isConfirmed) {
        await deleteMenuItem(item.id).unwrap();
    Swal.fire('Deleted!','Menu item has been deleted.','success');
    }
};
  const handleAddMenuItem = async (item) => {
   resetForm();
   setSelectedMenuItem(null);
    setShowModal(true);

};
  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
try{
   const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("specialTag", formData.specialTag);
    if(formData.image){
        formDataToSend.append("file", formData.image);
    }
let result;

//call api to create
result = await createMenuItem(formDataToSend).unwrap();
if(result.success!== false){
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
            <div className="card-body"> <MenuItemsTable menuItems={menuItems} isLoading={isLoading} error={error} refetch={refetch} onDelete={handleDeleteMenuItem} /></div>
          </div>
        </div>
      </div>
     {showModal && <MenuItemModal formData={formData} onSubmit={handleFormSubmit} onClose={handleCloseModal} isSubmitting={isSubmitting} onChange={handleInputChange} />}
    </div>
  )
}

export default MenuItemManagement