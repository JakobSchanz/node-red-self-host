# Node-RED Backend README

This program hosts Node-RED, which can be accessed either directly via the URL or through the React page in the "Node-RED" tab.  
The custom nodes are loaded from a MySQL database and saved locally.

## Starting the Program

To start the program, navigate to the folder containing the `main.js` file.  
Then execute the following command:  
```bash
node main.js
```

## Description of the Program Components

The program starts in the `main.js` file.  
First, it connects to the database and retrieves all tables, which are then written to a file located at **`/etc/nginx/nginx.conf`**. This file also contains the login credentials for the database.  
Next, it connects to the database again and loads all custom nodes.  
For each custom node, a separate folder is created containing one `.js` and one `.html` file.  
Node-RED is then started last.  

The server listens on port `8000`.

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