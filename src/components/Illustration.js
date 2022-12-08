import classes from "../styles/Illustration.module.css";
export default function Illustration({ src }) {
  return (
    <div className={classes.illustration}>
      <img src={src} alt="Login" />
    </div>
  );
}
