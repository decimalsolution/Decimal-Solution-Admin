/* eslint-disable no-unused-vars */

import { TagsInput } from "react-tag-input-component";
import axios from "axios";
import { Container, Group } from "@mantine/core";
import { useMutation, useQuery } from "react-query";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import InputField from "../../../components/InputField";
import TextArea from "../../../components/TextArea";
import Button from "../../../components/Button";
import PageHeader from "../../../components/PageHeader";
import { backendUrl } from "../../../constants/constants";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import DropZone from "../../../components/Dropzone";
import { useLocation, useNavigate } from "react-router";
import { routeNames } from "../../../Routes/routeNames";
// import SelectMenu from "../../../components/SelectMenu";
import TinyMCEEditor from "./TinyMCEEditor";

export const AddBlog = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  let { state } = useLocation();
  const [categories, setCategories] = useState([]);

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      blogTitle: "",
      altText: "",
      metaDescription: "",
      blogImage: null,
      blogData: "",
      seoTitle: "",
      authorName: "",
      focusKeywords: [],
    },

    validate: {
      blogTitle: (value) =>
        !value
          ? "Title is required"
          : value.length < 3
          ? "Title must be at least 3 characters long"
          : value.length > 100
          ? "Title must be at most 100 characters long"
          : null,
      altText: (value) =>
        !value
          ? "Alt Text is required"
          : value.length < 3
          ? "Alt Text must be at least 3 characters long"
          : value.length > 100
          ? "Alt Text must be at most 100 characters long"
          : null,
      metaDescription: (value) =>
        !value
          ? "Meta Description is required"
          : value.length < 125
          ? "Meta Description must be at least 125 characters long"
          : value.length > 160
          ? "Meta Description must be at most 160 characters long"
          : null,
      blogData: (value) => (value?.length > 0 ? null : "Please enter blogData"),
      blogImage: (value) => (value ? null : "Please upload a cover Image"),
      seoTitle: (value) =>
        !value
          ? "SEO Title is required"
          : value.length < 30
          ? "SEO Title must be at least 30 characters long"
          : value.length > 70
          ? "SEO Title must be at most 70 characters long"
          : null,
    },
  });

  //categories
  const { status } = useQuery(
    "fetchServices",
    () => {
      return axios.get(backendUrl + "/api/v1/web/services");
    },
    {
      onSuccess: (res) => {
        let data = res.data.data.map((item) => {
          return { value: item._id, label: item.title };
        });
        setCategories(data);
      },
    }
  );
  console.log("Form : ", form.values);
  useEffect(() => {
    if (state?.isUpdate) {
      form.setValues(state.data);
      // const clonedData = { ...state.data };
      // form.setValues(clonedData);
    }
  }, [state]);
  const handleAddService = useMutation(
    (values) => {
      if (state?.isUpdate) {
        return axios.patch(
          `${backendUrl}/api/v1/blog/${state?.data?._id}`,
          values,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
      } else {
        return axios.post(`${backendUrl}/api/v1/blog`, values, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
      }
    },
    {
      onSuccess: (response) => {
        if (response.data?.success) {
          showNotification({
            title: "Success",
            message: response?.data?.message,
            color: "green",
          });
          navigate(routeNames.general.viewBlogs);
          form.reset();
        } else {
          showNotification({
            title: "Error",
            message: response?.data?.message,
            color: "red",
          });
        }
      },
    }
  );

  return (
    <Container fluid>
      <PageHeader label={state?.isUpdate ? "Edit Blog" : "Add Blog"} />
      <form
        onSubmit={form.onSubmit((values) => handleAddService.mutate(values))}
      >
        <InputField
          label={"Title"}
          placeholder={"Enter Blog Title"}
          form={form}
          withAsterisk
          validateName={"blogTitle"}
        />
        <InputField
          label={"Cover Image Alt Text"}
          placeholder={"Enter Cover Image Alt Text"}
          form={form}
          withAsterisk
          validateName={"altText"}
        />
        <label
          style={{
            fontFamily:
              "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif",
            fontWeight: "550",
          }}
        >
          Focus Keywords
        </label>
        <TagsInput
          label={"Focus Keywords"} // Changed label from Meta Description to Blog Keywords
          value={form.values.focusKeywords}
          onChange={(tags) => form.setFieldValue("focusKeywords", tags)}
          placeHolder="Enter keywords"
          onlyUnique={true}
          addKeys={[9, 13, 32]}
          // Allows adding tags when Tab, Enter, or Space is pressed
        />
        <InputField
          label={"SEO Title"}
          placeholder={"Enter SEO Title here"}
          form={form}
          withAsterisk
          validateName={"seoTitle"}
        />
        <InputField
          label={"Author's Name"}
          placeholder={"Enter Blog's Author Name here"}
          form={form}
          withAsterisk
          validateName={"authorName"}
        />
        <TextArea
          label={"Meta Description"}
          placeholder={"Enter Meta Description"}
          rows="4"
          form={form}
          withAsterisk
          validateName={"metaDescription"}
        />

        {/* <TinyMCEEditor
          label={"Meta Description"}
          placeholder={"Enter Detailed Description"}
          form={form}
          withAsterisk
          validateName={"blogDescription"}
        /> */}

        <TinyMCEEditor
          label={"Blog Data"}
          placeholder={"Enter Blog Data"}
          form={form}
          withAsterisk
          validateName={"blogData"}
        />
        {/* y */}
        {/* <textarea name="" id=""></textarea> */}

        <Group position="center">
          <DropZone
            form={form}
            folderName={"service"}
            name={"blogImage"}
            label="Cover Image"
          />
          {/* <DropZone
            form={form}
            folderName={"service"}
            name={"homeImage"}
            label="Home Image"
          /> */}
        </Group>
        <Group position="right" mt={"md"}>
          <Button
            label={"Cancel"}
            variant={"outline"}
            onClick={() => navigate(routeNames.general.viewBlogs)}
          />
          <Button
            label={state?.isUpdate ? "Edit Blog" : "Add Blog"}
            type={"submit"}
            loading={handleAddService.isLoading}
          />
        </Group>
      </form>
    </Container>
  );
};

// /* eslint-disable no-unused-vars */

// import axios from "axios";
// import { Container, Group } from "@mantine/core";
// import { useMutation, useQuery } from "react-query";
// import { useForm } from "@mantine/form";
// import { showNotification } from "@mantine/notifications";
// import InputField from "../../../components/InputField";
// import TextArea from "../../../components/TextArea";
// import Button from "../../../components/Button";
// import PageHeader from "../../../components/PageHeader";
// import { backendUrl } from "../../../constants/constants";
// import { useContext, useEffect, useState } from "react";
// import { UserContext } from "../../../contexts/UserContext";
// import DropZone from "../../../components/Dropzone";
// import { useLocation, useNavigate } from "react-router";
// import { routeNames } from "../../../Routes/routeNames";
// // import SelectMenu from "../../../components/SelectMenu";
// import TinyMCEEditor from "./TinyMCEEditor";

// export const AddBlog = () => {
//   const { user } = useContext(UserContext);
//   const navigate = useNavigate();
//   let { state } = useLocation();
//   const [categories, setCategories] = useState([]);

//   const form = useForm({
//     validateInputOnChange: true,
//     initialValues: {
//       blogTitle: "",
//       altText: "",
//       metaDescription: "",
//       blogImage: null,
//       blogData: "",
//       seoTitle:"",
//       authorName:""
//     },

//     validate: {
//       blogTitle: (value) =>
//         !value
//           ? "Title is required"
//           : value.length < 3
//           ? "Title must be at least 3 characters long"
//           : value.length > 100
//           ? "Title must be at most 100 characters long"
//           : null,
//       altText: (value) =>
//         !value
//           ? "Alt Text is required"
//           : value.length < 3
//           ? "Alt Text must be at least 3 characters long"
//           : value.length > 100
//           ? "Alt Text must be at most 100 characters long"
//           : null,
//       metaDescription: (value) =>
//         !value
//           ? "Meta Description is required"
//           : value.length < 125
//           ? "Meta Description must be at least 125 characters long"
//           : value.length > 160
//           ? "Meta Description must be at most 160 characters long"
//           : null,
//       blogData: (value) => (value?.length > 0 ? null : "Please enter blogData"),
//       blogImage: (value) => (value ? null : "Please upload a cover Image"),
//       seoTitle: (value) =>
//         !value
//           ? "SEO Title is required"
//           : value.length < 30
//           ? "SEO Title must be at least 30 characters long"
//           : value.length > 70
//           ? "SEO Title must be at most 70 characters long"
//           : null,
//     },
//   });

//   //categories
//   const { status } = useQuery(
//     "fetchServices",
//     () => {
//       return axios.get(backendUrl + "/api/v1/web/services");
//     },
//     {
//       onSuccess: (res) => {
//         let data = res.data.data.map((item) => {
//           return { value: item._id, label: item.title };
//         });
//         setCategories(data);
//       },
//     }
//   );
// console.log("Form : " , form.values);
//   useEffect(() => {
//     if (state?.isUpdate) {
//       form.setValues(state.data);
//       // const clonedData = { ...state.data };
//       // form.setValues(clonedData);
//     }
//   }, [state]);
//   const handleAddService = useMutation(
//     (values) => {
//       if (state?.isUpdate)
//         return axios.patch(
//           `${backendUrl + `/api/v1/blog/${state?.data?._id}`}`,
//           values,
//           {
//             headers: {
//               authorization: `Bearer ${user.token}`,
//             },
//           }
//         );
//       else
//         return axios.post(`${backendUrl + "/api/v1/blog"}`, values, {
//           headers: {
//             authorization: `Bearer ${user.token}`,
//           },
//         });
//     },
//     {
//       onSuccess: (response) => {
//         if (response.data?.success) {
//           showNotification({
//             title: "Success",
//             message: response?.data?.message,
//             color: "green",
//           });
//           navigate(routeNames.general.viewBlogs);
//           form.reset();
//         } else {
//           showNotification({
//             title: "Error",
//             message: response?.data?.message,
//             color: "red",
//           });
//         }
//       },
//     }
//   );
//   return (
//     <Container fluid>
//       <PageHeader label={state?.isUpdate ? "Edit Blog" : "Add Blog"} />
//       <form
//         onSubmit={form.onSubmit((values) => handleAddService.mutate(values))}
//       >
//         <InputField
//           label={"Title"}
//           placeholder={"Enter Blog Title"}
//           form={form}
//           withAsterisk
//           validateName={"blogTitle"}
//         />
//         <InputField
//           label={"Cover Image Alt Text"}
//           placeholder={"Enter Cover Image Alt Text"}
//           form={form}
//           withAsterisk
//           validateName={"altText"}
//         />

// <InputField
//           label={"SEO Title"}
//           placeholder={"Enter SEO Title here"}
//           form={form}
//           withAsterisk
//           validateName={"seoTitle"}
//         />
//          <InputField
//           label={"Author's Name"}
//           placeholder={"Enter Blog's Author Name here"}
//           form={form}
//           withAsterisk
//           validateName={"authorName"}
//         />
//         <TextArea
//           label={"Meta Description"}
//           placeholder={"Enter Meta Description"}
//           rows="4"
//           form={form}
//           withAsterisk
//           validateName={"metaDescription"}
//         />

//         {/* <TinyMCEEditor
//           label={"Meta Description"}
//           placeholder={"Enter Detailed Description"}
//           form={form}
//           withAsterisk
//           validateName={"blogDescription"}
//         /> */}

//         <TinyMCEEditor
//           label={"Blog Data"}
//           placeholder={"Enter Blog Data"}
//           form={form}
//           withAsterisk
//           validateName={"blogData"}
//         />
//         {/* y */}
//         {/* <textarea name="" id=""></textarea> */}

//         <Group position="center">
//           <DropZone
//             form={form}
//             folderName={"service"}
//             name={"blogImage"}
//             label="Cover Image"
//           />
//           {/* <DropZone
//             form={form}
//             folderName={"service"}
//             name={"homeImage"}
//             label="Home Image"
//           /> */}
//         </Group>
//         <Group position="right" mt={"md"}>
//           <Button
//             label={"Cancel"}
//             variant={"outline"}
//             onClick={() => navigate(routeNames.general.viewBlogs)}
//           />
//           <Button
//             label={state?.isUpdate ? "Edit Blog" : "Add Blog"}
//             type={"submit"}
//             loading={handleAddService.isLoading}
//           />
//         </Group>
//       </form>
//     </Container>
//   );
// };
