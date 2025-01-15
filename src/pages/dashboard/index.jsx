import {
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Table,
  Upload,
} from "antd";
import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import { toast } from "react-toastify";
import FormItem from "antd/es/form/FormItem";
import { useForm } from "antd/es/form/Form";
import { PlusOutlined } from "@ant-design/icons";
import uploadFile from "../../utils/file";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [form] = useForm();

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => <span>{price.toLocaleString()} VND</span>, // Format price with currency
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Deleted",
      dataIndex: "deleted",
      key: "deleted",
      render: (deleted) => (deleted ? "Yes" : "No"),
    },
  ];

  const fetchProducts = async () => {
    try {
      const response = await api.get("products");
      console.log(response);
      setProducts(response.data);
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmitForm = async (values) => {
    try {
      const image = values.image.file.originFileObj;

      if (image) {
        const url = await uploadFile(image);
        values.image = url;
      }

      const response = await api.post("products", values);
      console.log(response);
      toast.success("Successfully create new product!");
      form.resetFields();
      setOpen(false);
      fetchProducts();
    } catch (err) {
      toast.error(err.response.data);
    }

    console.log(values);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Add new product</Button>
      <Modal
        open={isOpen}
        title="Create new product"
        onCancel={() => setOpen(false)}
        onOk={() => form.submit()}
      >
        <Form
          labelCol={{
            span: 24,
          }}
          onFinish={handleSubmitForm}
          form={form}
        >
          <FormItem
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Name can no be empty!",
              },
            ]}
          >
            <Input />
          </FormItem>

          <FormItem
            name="price"
            label="Price"
            rules={[
              {
                required: true,
                message: "Name can no be empty!",
              },
            ]}
          >
            <InputNumber />
          </FormItem>

          <FormItem
            name="quantity"
            label="Quantity"
            rules={[
              {
                required: true,
                message: "Name can no be empty!",
              },
              // {
              //   min: 1,
              //   message: "Quantity can not less than 1!",
              // },
            ]}
          >
            <InputNumber />
          </FormItem>

          <FormItem
            name="description"
            label="Description"
            rules={[
              {
                required: true,
                message: "Name can no be empty!",
              },
            ]}
          >
            <Input />
          </FormItem>

          <FormItem name="image" label="Image">
            <Upload
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
          </FormItem>
        </Form>

        {previewImage && (
          <Image
            wrapperStyle={{
              display: "none",
            }}
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => setPreviewOpen(visible),
              afterOpenChange: (visible) => !visible && setPreviewImage(""),
            }}
            src={previewImage}
          />
        )}
      </Modal>
      <Table columns={columns} dataSource={products} />
    </>
  );
}

export default Dashboard;
