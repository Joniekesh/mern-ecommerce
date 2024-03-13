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
  updateCategory,
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
  align-items: center;
  justify-content: center;
  flex-direction: column;
  max-width: 800px;
  width: 50%;
  padding: 10px;
  margin-top: 6rem;
  ${mobile({
    width: "100%",
    height: "100vh",
    marginTop: "3rem",
  })}
`;

const TopContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const CancelButton = styled.span`
  color: crimson;
  font-size: 24px;
  cursor: pointer;
  ${mobile({
    marginRight: "20px",
  })}
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
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
const TempImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 5px;
  object-fit: cover;
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
  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
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
  const [loading, setLoading] = useState(false);
  const [isCreate, setIsCreate] = useState(true);
  const [item, setItem] = useState(null);
  const [updatedName, setUpdatedName] = useState(item?.name);
  const [updatedFile, setUpdatedFile] = useState(item?.photo);
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateFile, setUpdateFile] = useState(null);

  const { categories, isLoading } = useSelector((state) => state.category);

  const dispatch = useDispatch();

  const isVerified = file !== null && name !== "";

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const upload = async (fileData) => {
    const formData = new FormData();
    formData.append("file", fileData);
    formData.append("upload_preset", "upload");

    setLoading(true);
    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/joniekesh/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      const url = data.secure_url;

      setLoading(false);
      return url;
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = await upload(file);

    url && (await dispatch(createCategory({ name, photo: url })));

    setName("");
    setFile(null);
    setOpen(false);
  };

  const handleEdit = (record) => {
    setOpen(true);
    setIsCreate(false);
    setItem(record);
  };

  useEffect(() => {
    if (item) {
      setUpdatedName(item.name);
      setUpdatedFile(item.photo);
    }
  }, [item]);

  const handleFileChange = (e) => {
    setUpdateFile(e.target.files[0]);
    setIsUpdate(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const url = await upload(updateFile);

    const updatedData = {
      _id: item._id,
      name: updatedName,
      photo: url,
    };

    await dispatch(updateCategory(updatedData));

    setOpen(false);
    setIsUpdate(false);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Photo",
      dataIndex: "photo",
      key: "photo",
      render: (text) => <Image src={text} alt="" />,
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
          <View onClick={() => handleEdit(record)}>View</View>
          <Delete onClick={() => dispatch(deleteCategory(record._id))}>
            Delete
          </Delete>
        </Action>
      ),
    },
  ];

  return (
    <Container>
      {open && (
        <CreateForm>
          <FormContainer>
            <TopContainer>
              <Title>{isCreate ? "Create" : "Edit"} Category</Title>
              <CancelButton
                onClick={() => {
                  setOpen(false);
                  setName("");
                  setFile(null);
                  setItem(null);
                  setIsUpdate(false);
                }}
              >
                X
              </CancelButton>
            </TopContainer>
            {isCreate ? (
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
                {file && <TempImage src={URL.createObjectURL(file)} alt="" />}
                <Icon htmlFor="fileInput">
                  {loading ? (
                    "Uploading Image..."
                  ) : (
                    <>
                      Select
                      <MdAddAPhoto />
                    </>
                  )}
                </Icon>

                <Button disabled={!isVerified} type="submit">
                  {isLoading ? "Loading" : "CREATE"}
                </Button>
              </Form>
            ) : (
              <Form onSubmit={handleUpdate}>
                <InputContainer>
                  <Label>Category Name</Label>
                  <Input
                    type="text"
                    value={updatedName}
                    onChange={(e) => setUpdatedName(e.target.value)}
                    placeholder="Enter category name"
                  />
                </InputContainer>

                <InputContainer>
                  <Input
                    type="file"
                    onChange={handleFileChange}
                    id="updateFile"
                    style={{ display: "none" }}
                  />
                </InputContainer>
                {isUpdate ? (
                  updateFile && (
                    <TempImage src={URL.createObjectURL(updateFile)} alt="" />
                  )
                ) : (
                  <TempImage src={updatedFile} alt="" />
                )}

                <Icon htmlFor="updateFile">
                  {loading ? (
                    "Uploading Image..."
                  ) : (
                    <>
                      Change
                      <MdAddAPhoto />
                    </>
                  )}
                </Icon>

                <Button type="submit">
                  {isLoading ? "Loading" : "UPDATE"}
                </Button>
              </Form>
            )}
          </FormContainer>
        </CreateForm>
      )}
      <Top>
        <Title>Categories</Title>
        <Create
          onClick={() => {
            setOpen(true);
            setIsCreate(true);
          }}
        >
          + CREATE
        </Create>
      </Top>
      <Table columns={columns} dataSource={categories} scroll={{ x: true }} />
    </Container>
  );
};

export default AdminCategory;
