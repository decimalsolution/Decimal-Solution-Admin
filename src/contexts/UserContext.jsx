import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  let userData = JSON.parse(localStorage.getItem("userData"));
  const [user, setUser] = useState({
    name: userData?.name,
    firstName: "",
    lastName: "",
    id: userData?.userId,
    email: userData?.email,
    phoneNumber: userData?.phoneNumber,
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdXBlckFkbWluVXNlcklkIjoiNjQ3NTlhODA4NmExNmJhOGFhNGI0NDkzIiwiaWF0IjoxNjg1NzEzMDAxLCJleHAiOjE2ODU3OTk0MDF9.Lkn6kAyhW-sVRNqWIv5AuWSlusRP7mu64IEuERLset0",
  });
  const value = { user, setUser };

  //logded in user information
  // const { data, status } = useQuery(
  //   "fetchMe",
  //   () => {
  //     return axios.get(
  //       `${backendUrl + `/api/user/listSingleUser/${userData?.userId}`}`,
  //       {
  //         headers: {
  //           "x-access-token": userData?.token,
  //         },
  //       }
  //     );
  //   },
  //   {
  //     refetchOnWindowFocus: false,
  //     onSuccess: (response) => {
  //       let user = response.data.data;
  //       setUser((u) => ({
  //         ...u,
  //         ngoId: user?.ngoId,
  //         firstName: user?.firstName,
  //         lastName: user?.lastName,
  //         name: user?.firstName + " " + user?.lastName,
  //         phoneNumber: user?.phoneNumber,
  //         profileImage: user?.profileImage,
  //         documents: response.data.documents,
  //       }));
  //     },
  //     enabled: !!userData?.token,
  //   }
  // );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
