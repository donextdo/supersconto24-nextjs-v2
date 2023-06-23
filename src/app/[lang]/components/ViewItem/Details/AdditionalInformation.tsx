const AdditionalInformation = ({data}:any) => {
    return (
        <div>
            <table className="border-collapse border w-full">
                <tbody>
                    {data.additionalInformation.map((item:any, index:any)=>(                    
                    <tr className="border" key={index}>
                        <td className="border px-4 py-2">{item.name}</td>
                        <td className="border px-4 py-2">{item.description}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdditionalInformation;