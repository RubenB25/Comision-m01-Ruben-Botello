import styles from "../styles/Landing.module.css";
import { Link } from "react-router-dom";
import CardsLayout from "../components/CardsLayout";
function HomePage() {
  return (
    
    <div className={styles.container}>
           <CardsLayout />
      <h1>Home Page</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
        labore placeat repellendus earum eum obcaecati tempora ipsum ab magnam
        impedit, quod dolores eos soluta voluptatum eveniet fuga eius. Laborum,
        quasi?
      </p>
      <Link to="/playlist">Go to Playlist's</Link>
    </div>
    
  );
}
export default HomePage;
