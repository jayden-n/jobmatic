import styled from "styled-components";

const SingleJobInfo = ({ icon, text }) => {
	return (
		<Wrapper>
			<span className='job-icon'>{icon}</span>
			<span className='job-text'>{text}</span>
		</Wrapper>
	);
};

const Wrapper = styled.div``;
export default SingleJobInfo;
