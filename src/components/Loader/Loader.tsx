import { Puff } from "react-loader-spinner";

const Loader = () => {
  return (
    <Puff
      visible={true}
      height="80"
      width="80"
      color="#36d7b7"
      ariaLabel="puff-loading"
      wrapperStyle={{ justifyContent: "center" }}
      wrapperClass=""
    />
  );
};

export default Loader;
