interface ErrorMessageProps {
  errorMessage: string | undefined;
}
const ErrorMessage : React.FC<ErrorMessageProps> = ({errorMessage}) => {
  return (
    <>
    {errorMessage && <p style={{color:'#800700', fontSize: '0.6rem'}}>{errorMessage}</p>}
    </>
  )
}

export default ErrorMessage;