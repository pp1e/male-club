import React, { Component } from 'react'
import ConsolesService from '../../services/ConsolesService'

class ListConsoles extends Component {
    constructor(props) {
        super(props)

        this.state = {
            consoles: []
        }
    }

    componentDidMount(){
        ConsolesService.getConsoles().then((res) => {
            this.setState({ consoles: res.data});
        });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Consoles List</h2>
                <div className = "row">
                    <table className = "table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th>name</th>
                            <th>number</th>
                            <th>description</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.consoles.map(
                                console =>
                                    <tr key = {console.id}>
                                        <td> {console.name} </td>
                                        <td> {console.number} </td>
                                        <td> {console.description} </td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>

                </div>

            </div>
        )
    }
}

export default ListConsoles