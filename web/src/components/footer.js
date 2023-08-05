import React from "react";
import { Link } from "react-router-dom";

function Footer() {
	return(
		<footer>
			<div className="created-by">
				<p>Created by <br /> <Link to='https://vk.com'>Vasiluk Egor</Link> </p>
			</div>
		</footer>
	)
}

export default Footer