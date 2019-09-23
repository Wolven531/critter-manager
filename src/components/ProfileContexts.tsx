import React, { Fragment, useContext, useState } from 'react'

// import './style.css'

const ProfileContext = React.createContext({
	addMoney: () => {
		console.log(`[addMoney | Context]`)
		return
	},
	changeProperty: (property: string, value: any) => { return },
	company: '',
	companyImage: '',
	fullName: '',
	money: 0,
	simpleTeamSwitch: (newTeam: string) => { return },
	team: '',
	url: '',
	userImage: '',
	userName: ''
})
const ProfileProvider = (props: any) => {
	// const [m, setM] = useState(0)
	const defaultInfo = {
		addMoney: () => {
			console.log(`[addMoney | Provider] money=${userInfo.money}`)
			setUserInfo({
				...userInfo,
				money: userInfo.money + 1
			})
			// setM(staleM => staleM + 1)
		},
		changeProperty: (property: string, value: any) => {
			setUserInfo({
				...userInfo,
				[property]: value
			})
		},
		company: 'SomeCompany',
		companyImage: 'https://svgshare.com/i/9ir.svg',
		fullName: 'This is the full name',
		// money: m,
		money: 0,
		simpleTeamSwitch: (newTeam: string) => {
			setUserInfo({
				...userInfo,
				team: newTeam
			})
		},
		team: 'ThisIsTheTeam',
		url: 'https://www.telerik.com/kendo-react-ui/',
		userImage: 'https://i.imgur.com/Y1XRKLf.png',
		userName: 'SomeUser'
	}
	const [userInfo, setUserInfo] = useState(defaultInfo)

	return (
		<ProfileContext.Provider value={userInfo}>
			{props.children}
		</ProfileContext.Provider>
	)
}

const ChangeTeam = () => {
	const context = useContext(ProfileContext)
	return (
		<Fragment>
			<button onClick={() => context.simpleTeamSwitch('Angular')}>Angular</button>
			<button onClick={() => context.simpleTeamSwitch('Vue')}>Vue</button>
			<button onClick={() => context.simpleTeamSwitch('React')}>React</button>
			{/* <button onClick={() => context.addMoney()}>Add Money</button> */}
			<button onClick={() => context.changeProperty('money', context.money + 1)}>Add Money</button>
		</Fragment>
	)
}

const Team = () => {
	const context = useContext(ProfileContext)
	return (
		<div className="team">
			<p className="profile-team">{context.team}</p>
		</div>
	)
}

const User = () => {
	const context = useContext(ProfileContext)
	return (
		<div className="user">
			<a href={context.url}>
				<img src={context.userImage} width="50px" />
			</a>
			<h1 className="profile-userName">{context.userName}</h1>
			<p className="profile-fullName">({context.fullName})</p>
			<p>Money: {context.money}</p>
			<Team />
			<ChangeTeam />
		</div>
	)
}

const Profile = () => {
	const context = useContext(ProfileContext)
	return (
		<div className="profile">
			<img src={context.companyImage} />
			<User />
		</div>
	)
}

const ProfileApp = () => (
	<ProfileProvider>
		<Profile />
	</ProfileProvider>
)

export { ProfileApp }
