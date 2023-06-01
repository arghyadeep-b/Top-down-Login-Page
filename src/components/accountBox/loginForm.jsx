import React, { useContext, useState } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import Axios from "axios";

export function LoginForm(props) {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });


  // this exists to download the JSON data so we know its being converted correctly
  const downloadFile = ({ data, fileName, fileType }) => {
    const blob = new Blob([data], { type: fileType });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a); // append the link to the document body
    a.click(); // simulate a click event on the link
    window.URL.revokeObjectURL(url); // revoke the object URL
    document.body.removeChild(a); // remove the link from the document body
  };

  // Send login data to the backend
  const login = async (e) => {
    e.preventDefault() 

    await Axios({
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      data: formData,
      withCredentials: true,
      url: "/login",
    }).then((res) => {
      console.log(res.data)
      sessionStorage.setItem("Authorization", `Bearer ${res.data}`);
      // then do useNavigate to redirect to homepage
    }).catch((err) => {
        console.error(err.response.data)
    });
  };

  // const onHandleSubmit = (event) => {
  //   event.preventDefault();
  //   const jsonString = JSON.stringify(formData);

  //   downloadFile({
  //     data: jsonString,
  //     fileName: "form-data.json",
  //     fileType: "text/json"
  //   })


  // }
  const { switchToSignup } = useContext(AccountContext);

  return (
    <BoxContainer>
      <FormContainer>
        <Input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value})}/>
        <Input type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value})}/>
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">Forget your password?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" onClick={login}>Signin</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Don't have an accoun?{" "}
        <BoldLink href="#" onClick={switchToSignup}>
          Signup
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
