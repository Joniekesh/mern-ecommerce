import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import SideBar from "../../components/admin/SideBar";
import { Link } from "react-router-dom";
import {
  adminGetProducts,
  deleteProduct,
} from "../../redux/adminRedux/adminApiCalls";
import { useEffect } from "react";
import Loader from "../../components/Loader";
import { Table } from "antd";

const Container = styled.div`
  width: 100%;
  overflow: hidden;
  margin: auto;
  margin-top: 8rem;
  display: flex;
`;

const RightContainer = styled.div`
  padding: 10px;
  flex: 5;
  overflow-x: auto;
  height: fit-content;
`;

const Top = styled.div`
  margin-bottom: 10px;
  position: relative;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  color: teal;
  font-weight: 500;
`;

const AddUser = styled.button`
  padding: 6px;
  font-weight: 500;
  cursor: pointer;
  color: teal;
  position: absolute;
  top: 0px;
  right: 5px;
`;

const Title = styled.h2``;

const Products = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.currentUser);
  const adminProduct = useSelector((state) => state.adminProduct);
  const { products, isLoading } = adminProduct;

  const filteredProducts = products.map((product) => {
    return {
      _id: product._id,
      product: product.name,
      image: product.image,
      countInStock: product.countInStock,
      price: product.price,
    };
  });

  if (!user.isAdmin) {
    toast.error("You are not authorized to access this route", {
      theme: "colored",
    });
    history.push("/");
  }

  useEffect(() => {
    dispatch(adminGetProducts());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "PRODUCT",
      dataIndex: "product",
      key: "product",
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <img
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
            src={record.image}
            alt=""
          />
          <span>{record.product}</span>
        </div>
      ),
    },
    {
      title: "STOCK",
      dataIndex: "countInStock",
      key: "countInStock",
    },
    {
      title: "PRICE($)",
      dataIndex: "price",
      key: "price",
    },

    {
      title: "ACTION",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <button
            style={{
              padding: "5px",
              cursor: "pointer",
              color: "green",
              background: "#00800078",
              border: "none",
            }}
          >
            <Link to={`/admin/products/${record._id}`}>View</Link>
          </button>
          <button
            style={{
              padding: "5px",
              cursor: "pointer",
              color: "crimson",
              background: "#dc143c7b",
              border: "none",
            }}
            onClick={() => handleDelete(record._id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <Container>
      <SideBar />
      {isLoading ? (
        <Loader />
      ) : (
        <RightContainer>
          <Top>
            <TitleContainer>
              <Title>PRODUCTS</Title>
            </TitleContainer>
            <Link to="/admin/createProduct">
              <AddUser>+ CREATE</AddUser>
            </Link>
          </Top>
          {products.length === 0 ? (
            <h4>No products to show</h4>
          ) : (
            <Table dataSource={filteredProducts} columns={columns} />
          )}
        </RightContainer>
      )}
    </Container>
  );
};

export default Products;
