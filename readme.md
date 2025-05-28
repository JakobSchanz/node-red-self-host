# Node-RED Backend README

This program hosts Node-RED, which can be accessed either directly via the URL or through the React page in the "Node-RED" tab.
The content of the database can be edited via the React page.  
The custom nodes are loaded from a MySQL database and saved locally.

Mehr Informationen unter: [https://github.com/JakobSchanz/embed-react_node-red/tree/main](https://github.com/JakobSchanz/embed-react_node-red/tree/main)

## Starting the Program

To start the programme, navigate to the folder containing the file `startNodeRed.js`. This should be the order `src/start-node-red`. <br>
Then execute the following command: 
```bash
node startNodeRed.js
```
This is important because if the programme is started via the main.js, the programme cannot be restarted via the website.

## Description of the Program Components

The startNodeRed.js then starts the programme. <br>
In the main.js. First, the tables are read from the database. The tables are then written to the file `data\programm_data\db\db-config.js.` <br> 
This file also contains the login data for the database. <br> 
Then all nodes are read from the database and a folder is created for each custom node. <br> 
Each folder must contain an HTML and a JS file. <br> 
Then the server is started. Via the Node-Red and other endpoints are provided <br> 
to be able to create new custom nodes and flows via the react page: [https://github.com/JakobSchanz/embed-react_node-red/tree/main](https://github.com/JakobSchanz/embed-react_node-red/tree/main). <br>
Then Node-Red is starting <br>
The server listens on port `8000`.

## Endpoints

- **/db-api/crate-custom-node**
    - To create a new custom node
    - requires the following values (Table Filds):
        - name 
        - description 
        - category 
- /db-api/crate-new-table
    - To Create a new table / Category
    - requires the following values (Table Filds):
        - name
        - color (optional)
        - icon (optional)
- /db-api/table-list
    - returns an array with all tables in the DB
    - requires no values 
- /restart-node-red
    - to restart node-red
    - requires no values

Node-Red runs on the default URL, endpoints for creating or retrieving Flows are provided by Node-Red 

## How the Database Works

The database is a MySQL database hosted on a server.  
For each category, such as "processes," a separate table is created with the custom values.  
The table structure is as follows:

<table border="1">
  <tr>
    <th>process_id</th>
    <th>name</th>
    <th>description</th>
    <th>category</th>
    <th>color</th>
    <th>icon</th>
  </tr>
  <tr>
    <td>1</td>
    <td>Plastic-mold-casting</td>
    <td>Casting of plastic molds</td>
    <td>process</td>
    <td>#47919e</td>
    <td>fa-industry</td>
  </tr>
</table>

The **process_id** field is only used to identify the node and has no effect on Node-RED.  
The **name** field contains the name displayed in Node-RED.  
The **description** field contains the description shown in Node-RED.  
The **category** field indicates the category where the node will appear in Node-RED.  
The **color** field contains a hex color code for the node's color, for example: `#47919e`.  
A default color value is set when the table is created and applies to the whole category.  
The same applies to the **icon** field, where a default value must also be set initially. Node-RED only accepts icons from <br> 
FontAwesome version 4: [https://fontawesome.com/v4/icons/](https://fontawesome.com/v4/icons/)  
Only the icon name is required, for example: `fa-industry`.

## Change settings

To change settings you have to go to the following path of the <br> programme: `data/programm_data`. <br> 
There you can edit the database and node-red settings and edit the templates for the custom nodes. 

### Node-Red settings 

The node-red settigs are located in the following path: `./node_red_settings/settings.js.` <br> 
All settings that can also be edited / added under normally hosted node-red can be added there. <br> 
More information: [https://nodered.org/docs/user-guide/runtime/configuration](https://nodered.org/docs/user-guide/runtime/configuration)


You can also customise the templates for the custom nodes by going to the `node_templates` folder. <br> 
There are 2 folders `html_template` and `js_template`. <br> 
The files contained therein are used by the programme to create the nodes. <br>
Changes are applied after a restart of the programme. 

### Database settings 

The database settings are in the folder `./db`. <br>
The **host**, **username**, **password** and the **database** used can be customised in the basic_config area. <br>
Nothing needs to be adjusted in the tables area as the programme selects the tables automatically. 