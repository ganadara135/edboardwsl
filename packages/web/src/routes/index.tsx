import * as React from "react";
import {BrowserRouter, Route, Switch,  } from 'react-router-dom';


import { TextPage } from "../modules/TextPage";

import { EditYearMonthDetail } from "../modules/EditYearMonthDetail";
// import { AuthRoute } from "@abb/controller";
// import { CreateListingConnector } from "../modules/listing/create/CreateListingConnector";
// import { DemoDelete } from "../modules/listing/delete/DemoDelete";
import { InsertMonthConnector } from "../modules/InsertMonth/InsertMonthConnector";
import { InsertYearConnector } from "../modules/InsertYear/InsertYearConnector";
import { CreateEDBoardConnector } from "../modules/CreateEDBoard/CreateEDBoardConnector";
import { ViewListingMNConnector } from "../modules/ViewListingMN/ViewListingMNconnector";
import { ViewListingConnector } from "../modules/ViewListing/ViewListingconnector";
import { InsertData } from "../modules/InsertData/InsertData";
import Home  from "../modules/Home";
import Header from "../modules/Header";


export const Routes = () => (
    <BrowserRouter>
        <Header/>
        <Switch>        
            <Route exact={true} path="/"  component={Home} />
            <Route exact={true} path="/createedb" component={CreateEDBoardConnector} />
            <Route exact={true} path="/insertyear/:boardName" component={InsertYearConnector} />
            <Route exact={true} path="/insertmonth/:boardName" component={InsertMonthConnector} />
            <Route exact={true} path="/viewmn" component={ViewListingMNConnector} />
            <Route exact={true} path="/viewraw" component={ViewListingConnector} />
            
            <Route exact={true} path="/insertData" component={InsertData}  />

            <Route path="/donemsg" component={TextPage} />
        {/* <Link to={`/editpage/${l.m_id}/${l.m_month}/${l.m_goal}/${l.m_description}/${l.y_id}/${l.y_year}/${l.y_goal}/${l.y_description}`}>               */}
            {/* <Route path="/editpage/:m_id/:m_month/:m_goal/:m_description/:y_id/:y_year/:y_goal/:y_description" component={EditYearMonthDetail} /> */}
            <Route path="/editpage" component={EditYearMonthDetail} />
            {/* <Redirect from={"*"} to={"/"} /> */}
            {/* <AuthRoute path="/create-listing" component={CreateListingConnector} />
            <AuthRoute path="/delete-demo" component={DemoDelete} /> */}
        </Switch>
    </BrowserRouter>
);