type Props = {
    title: string
    children: JSX.Element,
};

const FormContainer: React.FC<Props> = ({ children, title }: Props): JSX.Element => {
    return (
        <div className="container-fluid vh-100" style={{ marginTop: '200px' }}>
            <div className="" style={{ marginTop: '200px' }}>
                <div className="rounded d-flex justify-content-center">
                    <div className="col-md-4 col-sm-12 shadow-lg p-5 bg-light">
                        <div className="text-center">
                            <h3 className="text-primary">{title}</h3>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </div>

    );
}

export default FormContainer;