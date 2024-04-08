/* eslint-disable react/prop-types */
function Erro({ erro }) {
	if (!erro) return null;

	return <p className="text-red-600 mx-4">{erro}</p>;
}

export default Erro;
