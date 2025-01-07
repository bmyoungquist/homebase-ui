"use client"

import * as React from "react"
import {
	Box,
	Boxes,
	Calculator,
	CircleDollarSign,
	FileQuestion,
	House,
	Map,
	MapPin,
	PencilRuler,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar"
import { NavTaxonomy } from "./nav-taxonomy"

// This is sample data.
const data = {
	teams: [
		{
			name: "Small Business",
			logo: Box,
			plan: "Startup",
		},
		{
			name: "Home",
			logo: House,
			plan: "Free",
		},
	],
	navMain: [
		{
			title: "Inventory",
			url: "/inventory",
			icon: Boxes,
			disabled: true,
			items: [
				{
					title: "Groceries",
					url: "#",
				},
				{
					title: "Electronics",
					url: "#",
				},
			],
		},
		{
			title: "Budget",
			url: "/budget",
			icon: Calculator,
			disabled: true,
			items: [
				{
					title: "Income",
					url: "#",
				},
				{
					title: "Expenses",
					url: "#",
				},
				{
					title: "Subscriptions",
					url: "#",
				},
			],
		},
	],
	navTaxonomy: [
		{
			title: "Places",
			url: "/places",
			icon: Map,
			disabled: false
		},
		{
			title: "Locations",
			url: "/locations",
			icon: MapPin,
			disabled: true,
		},
		{
			title: "Containers",
			url: "/containers",
			icon: Box,
			disabled: true
		},
		{
			title: "Item Types",
			url: "/item-types",
			icon: FileQuestion,
			disabled: true
		},
		{
			title: "Units",
			url: "/measurement-units",
			icon: PencilRuler,
			disabled: true
		},
		{
			title: "Currencies",
			url: "/currencies",
			icon: CircleDollarSign,
			disabled: true
		}
	],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<TeamSwitcher teams={data.teams} />
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
				<NavTaxonomy items={data.navTaxonomy} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	)
}
