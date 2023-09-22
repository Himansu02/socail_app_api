import { Fragment, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styles from "./Layout.module.css"
import MainNavigation from "./MainNavigation";
import { useAuth } from "@clerk/clerk-react";
const Layout=()=>{

    return <Fragment>
        <MainNavigation></MainNavigation>
        <main className={styles.main}><Outlet/></main>
    </Fragment>
}

export default Layout;