import classes from "./LoadingSpinner.module.css";

const LoadingSpinner = () => {
  return (
    <div>
      <h1 style={{ color: "#999" }}>The App Data is Getting Fetched..</h1>
      <div style={{display:"flex",justifyContent:"center",marginTop:"20px"}}>
        <div className={classes.spinner}></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
