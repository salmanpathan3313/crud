import axios from "axios";
import React,{ useEffect, useState } from "react";
import { Button, Table, TableCell } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


export default function Read(){
    
    const [APIData, setAPIData] = useState([]);
    useEffect( () => {
        axios.get('https://65257b1167cfb1e59ce758b5.mockapi.io/fakeData')
        .then((response) => {
            setAPIData(response.data);
        })
    }, [])

    const setData = (data) => {
        let { id, firstName, lastName, checkbox } = data;
        localStorage.setItem('ID', id)
        localStorage.setItem('First Name', firstName)
        localStorage.setItem('Last Name', lastName)
        localStorage.setItem('Checkbox Value', checkbox)
     }

    const onDelete = (id) => {
        axios.delete(`https://65257b1167cfb1e59ce758b5.mockapi.io/fakeData/${id}`)
        .then(() => {
            getData();
        })
    }

    const getData = () => {
        axios.get(`https://65257b1167cfb1e59ce758b5.mockapi.io/fakeData`)
        .then((getData) => {
            setAPIData(getData.data);
        })
    }

    return(
        <div>
            <div className="btnadd">
            <Link to='/create'>
                <Button>Add</Button>
            </Link>
            </div>
            <Table singleLine>
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>FirstName</Table.HeaderCell>
                    <Table.HeaderCell>LastName</Table.HeaderCell>
                    <Table.HeaderCell>Checked</Table.HeaderCell>
                    <Table.HeaderCell>Update</Table.HeaderCell>
                    <Table.HeaderCell>Delete</Table.HeaderCell>
                </Table.Row>
                </Table.Header>

                <Table.Body>
                    {APIData.map((data)=> {
                        return(
                           
                            <Table.Row>
                                <Table.Cell>{data.firstName}</Table.Cell>
                                <Table.Cell>{data.lastName}</Table.Cell>
                                <Table.Cell>{data.checkbox ? 'checked' : 'unchecked'}</Table.Cell>
                                <Table.Cell>
                                    <Link to='/update'>
                                        <Button onClick={ ()=> setData(data)}>Update</Button>
                                    </Link>
                                </Table.Cell>
                                <TableCell>
                                    <Button onClick={ ()=> onDelete(data.id)}>Delete</Button>
                                </TableCell>
                            </Table.Row>
                        )}
                    )}
                
                </Table.Body>
            </Table>
        </div>
    )
}