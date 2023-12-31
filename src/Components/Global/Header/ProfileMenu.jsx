import React, { useContext, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion';
import { AppContext } from '../../../App';
import MyLink from '../MyLink';
import { Toggle } from '../ToggleBtn/Toggle';
import SelectBox from '../SelectBox/SelectBox';
import Option from '../SelectBox/Option';
import Menu from '../SelectBox/Menu';

function ProfileMenu({profileMenu, setProfileMenu, btnRef}) {
    const { currentUser, theme, setTheme, setIsAuth, setCurrentUser, language, selectedLanguage, setSelectedLanguage } = useContext(AppContext);
    const ref = useRef(null)
    const logout = () => {
        localStorage.removeItem("jwt");
        setIsAuth(false);
        setCurrentUser({});
        location.replace('/login')
      };
    const handleClik = (toggled) => {
        let th = '';
        if(toggled) {
            setTheme('dark')
            th = 'dark'
        } else {
            setTheme('light')
            th = 'light'
        }
        fetch(`${import.meta.env.VITE_API}/clients/update-theme`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('jwt')
            },
            body: JSON.stringify({ theme: th })
          })
    }
    useEffect(() => {
        function handleClickOutside(event) {
          if (event.target == ref.current) {
            setProfileMenu(false)
          }
        }
        document.addEventListener('click', handleClickOutside);
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
    }, [])
  return (
    <div 
        ref={ref}
        className="
            min-w-[100vw] min-h-screen 
            absolute right-0 top-[calc(100%+20px)] 
            cursor-default
        "
    >
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: .3 }}
            className={`
                absolute top-0 right-0 bg-light-secondary-500 h-auto px-3 py-3 w-full min-w-[270px] max-w-fit rounded-xl shadow-lg 
                flex flex-col gap-1 dark:bg-dark-primary-700 dark:shadow-xl
            `}>
            <h1 className="text-light-quarternary-500 dark:text-dark-quarternary-500 text-lg font-semibold">{ language.profile }</h1>
            <MyLink to='/profile' 
                className="flex items-center gap-3 hover:bg-light-tertiary-200 hover:shadow
                    transition-all duration-300 rounded-lg px-3 py-3 
                    dark:hover:bg-dark-primary-500 dark:hover:shadow
                ">
                <img src={`${import.meta.env.VITE_ASSETS}/Clients-images/${ currentUser.image }`} className="max-w-[40px] w-[40px] h-[40px] object-cover object-center rounded-full shadow-lg" />
                <div className="flex flex-col text-light-quarternary-500 dark:text-dark-tertiary-300">
                    <h1 className="text-sm font-semibold">{ currentUser.fullname }</h1>
                    <h1 className="text-xs">
                        <span className="text-xs">{ language.admin }</span>
                        <span className="text-xs"> | </span>
                        <span className="text-xs ">
                            <i className="fas fa-circle text-green-500 mr-1"></i>
                            { language.online }
                        </span>
                    </h1>
                </div>
            </MyLink>

            <div className="w-[80%] mx-auto h-[1px] bg-light-secondary-300 dark:bg-dark-primary-400 my-2"></div>

            <h1 className="text-light-quarternary-500 text-lg font-semibold dark:text-dark-tertiary-300">{language.settings}</h1>
            <div className="flex gap-2 justify-between p-2 ">
                <h1 className="text-light-quarternary-400 text-sm">{ language.dark_mode }</h1>
                <Toggle toggled={theme == 'dark' ? true : false} onClick={handleClik} />
            </div>
            
            <div className="flex gap-2 justify-between px-2 items-center">
                <h1 className="text-light-quarternary-400 text-sm ">{ language.language } </h1>
                <SelectBox {...{
                    selected: selectedLanguage,
                    setSelected: setSelectedLanguage,
                }}>
                    <Menu>
                        <Option value="English" >
                            <div className="flex items-center gap-2 px-3 py-2 rounded-lg">
                                <h1 className="text-light-quarternary-500 dark:text-dark-quarternary-500 text-sm">{language.english}</h1>
                            </div>
                        </Option>
                        <Option value="French" >
                            <div className="flex items-center gap-2 px-3 py-2 rounded-lg">
                                <h1 className="text-light-quarternary-500 dark:text-dark-quarternary-500 text-sm">{language.french}</h1>
                            </div>
                        </Option>
                        <Option value="Arabic" >
                            <div className="flex items-center gap-2 px-3 py-2 rounded-lg">
                                <h1 className="text-light-quarternary-500 dark:text-dark-quarternary-500 text-sm">{language.arabic}</h1>
                            </div>
                        </Option>
                    </Menu>
                </SelectBox>
            </div>
            
            <div className="w-[80%] mx-auto h-[1px] bg-light-secondary-300 dark:bg-dark-secondary-300 my-2"></div>

            <button 
                onClick={logout}
                className="w-fit flex items-center justify-center gap-3 bg-light-primary-500 shadow
                    text-light-quarternary-500 
                    hover:bg-light-quarternary-300 hover:text-light-primary-500 hover:shadow-lg
                    transition-all duration-300 rounded-full px-5 py-2 mx-auto mt-2
                    dark:bg-dark-primary-500 dark:text-dark-quarternary-500 dark:hover:bg-dark-secondary-700
                ">
                <i className="fas fa-sign-out-alt text-lg"></i>
                <h1 className="text-sm w-fit font-semibold">Logout</h1>
            </button>
            
            
            
        </motion.div>
    </div>
  )
}

export default ProfileMenu