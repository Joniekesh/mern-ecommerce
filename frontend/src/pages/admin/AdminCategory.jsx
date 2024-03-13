import React, { useEffect } from "react";
import styled from "styled-components";
import { Table } from "antd";
import { useState } from "react";
import { MdAddAPhoto } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  deleteCategory,
  getCategories,
} from "../../redux/apiCalls/categoryApiCalls";
import { mobile } from "../../responsive";

const Container = styled.div`
  max-width: 1200px;
  min-height: 100vh;
  overflow: hidden;
  margin: auto;
  margin-top: 8rem;
  padding: 0 2rem;
`;

const CreateForm = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

const FormContainer = styled.span`
  background-color: white;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  max-width: 800px;
  width: 50%;
  padding: 20px;
  margin-top: 2rem;
  ${mobile({
    width: "90%",
    height: "90vh",
  })}
`;

const TopContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CancelButton = styled.span`
  color: crimson;
  font-size: 24px;
  cursor: pointer;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 90%;
  margin-top: 50px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

const Label = styled.label``;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
`;

const Icon = styled.label`
  background-color: #08173b;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: white;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;

  /* width: 100%; */
`;
const Button = styled.button`
  width: 100%;
  padding: 10px;
  cursor: pointer;
  border: none;
  background-color: teal;
  color: white;
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.03);
  }
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Title = styled.h2``;

const Create = styled.button`
  padding: 8px;
  cursor: pointer;
  font-weight: 500;
  background-color: teal;
  color: white;
  border: none;
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.02);
  }
`;

const Image = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

const Action = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Delete = styled.button`
  padding: 5px;
  cursor: pointer;
  color: crimson;
  background: #dc143c7b;
  border: none;
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.03);
  }
`;

const View = styled.button`
  padding: 5px;
  cursor: pointer;
  color: green;
  background: #00800078;
  border: none;
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

const AdminCategory = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  const { categories, isLoading, error } = useSelector(
    (state) => state.category
  );

  console.log(categories);
  console.log(uploadedImageUrl);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "upload");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/joniekesh/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    setUploadedImageUrl(data.secure_url);

    const newCategory = {
      name,
      photo: uploadedImageUrl,
    };

    await dispatch(createCategory(newCategory));

    setName("");
    setFile("");
    setOpen(false);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      //   render: (text) => <span>{text.slice(0, 10)}...</span>,
    },
    {
      title: "Photo",
      dataIndex: "photo",
      key: "photo",
      render: (_, record) => <Image src={record.photo} alt="" />,
    },
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Action>
          <View>View</View>
          <Delete onClick={() => dispatch(deleteCategory(record._id))}>
            Delete
          </Delete>
        </Action>
      ),
    },
  ];

  const data = [
    {
      _id: "1",
      photo: "/assets/bag1.jpeg",
      name: "bags",
    },
    {
      _id: "2",
      photo: "/assets/bv10.jpeg",
      name: "beverages",
    },
    {
      _id: "3",
      photo: "/assets/cloth2.jpeg",
      name: "clothes",
    },
    {
      _id: "4",
      photo: "/assets/computer4.jpeg",
      name: "computers",
    },
    {
      _id: "5",
      photo: "/assets/electronics7.jpeg",
      name: "electronics",
    },
    {
      _id: "6",
      photo: "/assets/phone2.jpeg",
      name: "phones",
    },
    {
      _id: "7",
      photo: "/assets/shoe6.jpeg",
      name: "shoes",
    },
    {
      _id: "8",
      photo: "/assets/watch1.jpeg",
      name: "watches",
    },
  ];

  return (
    <Container>
      {open && (
        <CreateForm>
          <FormContainer>
            <TopContainer>
              <Title>Create Category</Title>
              <CancelButton onClick={() => setOpen(false)}>X</CancelButton>
            </TopContainer>
            <Form onSubmit={handleSubmit}>
              <InputContainer>
                <Label>Category Name</Label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter category name"
                />
              </InputContainer>

              <InputContainer>
                <Input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  id="fileInput"
                  style={{ display: "none" }}
                />
              </InputContainer>
              <Icon htmlFor="fileInput">
                Upload
                <MdAddAPhoto />
              </Icon>

              <Button type="submi">{isLoading ? "Loading" : "Create"}</Button>
            </Form>
          </FormContainer>
        </CreateForm>
      )}
      <Top>
        <Title>Categories</Title>
        <Create onClick={() => setOpen(true)}>+ CREATE</Create>
      </Top>
      <Table columns={columns} dataSource={categories} scroll={{ x: true }} />
    </Container>
  );
};

export default AdminCategory;
