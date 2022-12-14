import React, { useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import "./myOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/OrderAction";
import { Link } from "react-router-dom";
import MetaData from "../MetaData/MetaData";
import LaunchIcon from "@mui/icons-material/Launch";
import Loading from "../loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyOrder = () => {
  const dispatch = useDispatch();
   
  const { loading, error, orders } = useSelector((state) => state.myOrder);

  const { user, isAuthenticated } = useSelector((state) => state.user);

  const columns = [
    
    {
      field: "actions",
      flex: 0,
      headerName: "Details",
      minWidth: 150,
      type: "number",
      sortable: false,
      minWidth: 50,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    
   
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },


      
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        



        itemsQty: item.orderItems.length === 0 ? 1 : item.orderItems.length,
        id:item._id,
        product: item.name,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });
    console.log(orders)

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, alert, error]);

  return (
    <>
      <MetaData title={`${user.name} - Orders`} />
    {/* { orders.length === 0 ? (
          <div className="emptyCart">
            <RemoveShoppingCartIcon />
            <Typography>No Items In Cart</Typography>
            <Link to="/products">View Products</Link>
            <BottomTab />
          </div>
        ): */}
      {loading ? (
        <Loading />
      ) : (
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />
        </div>
      )}
     
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default MyOrder;
