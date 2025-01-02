import styles from "./Container.module.scss";

const Container = (props) => {
	console.log("Rendering Container Component");
	return <div className={styles.container}>{props.children}</div>;
};

export default Container;
