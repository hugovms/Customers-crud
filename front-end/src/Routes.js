import React from 'react';

import { 
    Customer,
    CustomerForm,
    CustomerShow
} from "./pages";

export default function GetRoutes() {
    return [
        {
            title: "Clientes",
            icon: "fas fa-user",
            path: "/",
            component: (routeProps) => <Customer routeProps={routeProps} title="Clientes" />,
            showMenu: true,
            exact: true
        },
        {
            title: "Criação de Cliente",
            icon: "",
            path: "/customer/new",
            component: (routeProps) => <CustomerForm routeProps={routeProps} title="Criar Cliente" />,
            showMenu: false,
            exact: false
        },
        {
            title: "Mostrar Cliente",
            icon: "",
            path: "/customer/show/:id",
            component: (routeProps) => <CustomerShow routeProps={routeProps} title="Ver Cliente" />,
            showMenu: false,
            exact: false
        },
        {
            title: "Edição de Cliente",
            icon: "",
            path: "/customer/edit/:id",
            component: (routeProps) => <CustomerForm routeProps={routeProps} title="Editar Cliente" />,
            showMenu: false,
            exact: false
        },
    ];
}
