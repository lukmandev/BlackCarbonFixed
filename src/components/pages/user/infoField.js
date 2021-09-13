

const InfoField = ({ icon, value }) => {
	console.log()
	return (
		<div className="form__item grid items-center">
		    <div className="icon__preview flex items-center">
		    	<i className={icon} />
		    </div>
		    <div className="form__item-info text-white">
		    	{value ? value : "Пользовател ничего не написал"}
		    </div>
		</div>
	)
}


export default InfoField;