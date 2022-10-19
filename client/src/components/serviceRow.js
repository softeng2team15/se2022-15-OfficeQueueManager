function ServiceRow(props){
    return(
        <tr bgcolor='#cfe2ff'>
            <td>{props.service.id}</td>
            <td>{props.service.name}</td>
            <td>{props.service.expectedTime}</td>
        </tr>
    )
}

export default ServiceRow;