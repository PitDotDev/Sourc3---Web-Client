import React, { useEffect, useRef, useState } from 'react';
import {
  Button, Input, Popup, Section, Window,
} from '@app/shared/components';
import {
  IconDropMenu,
  IconEdit,
  IconProfileLarge,
  IconProfileLarge2,
  IconProfileLarge3,
  IconProfileLarge4,
  // IconRemove,
} from '@app/shared/icons';
import { css } from '@linaria/core';
import { styled } from '@linaria/react';
import useOutsideClick from '@app/shared/hooks/OutsideClickHook';
// import { profile } from '@app/shared/constants/profile';

const ProfileComponent = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: flex-start;
  & > div:nth-child(odd) {
    margin: 8px 7px 0 8px;
  }
  & > div:nth-child(even) {
    margin: 8px 8px 0 4px;
  }
  margin-bottom: 16px;

  .wrapper {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 172px;
    height: 80px;
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.05);
    box-sizing: border-box;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    z-index: 999;
    height: auto;
  }
  .wrapperItems {
    height: 100%;
    & > li:nth-child(even) > .btnProfile:hover,
    .btnProfile:active {
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
    }
    & > li:nth-child(odd) > .btnProfile:hover,
    .btnProfile:active {
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }
  }
  .btnprofile: {
    font-size: 16px;
    line-height: 16px;
    font-weight: 600;
    padding: 2px 16px;
    margin: 0;
  }
`;
const Profile = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  margin: 16px 0;
`;
const Name = styled.p`
margin: 0
font-weight: 500;
font-size: 16px;
line-height: 18.8px;
margin: 16px 10px 16px;
text-align: right;
letter-spacing: 0.1px;
`;

const style = css`
  position: absolute;
  top: 8px;
  right: 0;
`;
const overlay = css`
  background: rgba(0, 0, 0, 0.05);
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 3;
  top: 0;
  left: 0;
  margin: 0 0 !important;
`;

function Manage() {
  const avatar = [IconProfileLarge, IconProfileLarge2, IconProfileLarge3, IconProfileLarge4];

  const [data, setData] = useState([]);
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [id, setId] = useState(null);
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState('');
  const inputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    setData(JSON.parse(localStorage.getItem('default')));
  }, []);

  useEffect(() => {
    localStorage.setItem('default', JSON.stringify(data));
    const activePid = JSON.parse(localStorage.getItem('default')).filter((item) => item.active === true);
    chrome.storage.sync.set({ activePid }, () => {});
  }, [data]);

  const addUser = (newName) => {
    const ava = Math.floor(Math.random() * 4);

    // let id = null;
    // const randomMath = () => {
    //   const rNum = Math.floor(Math.random() * 100);
    //   console.log(rNum);
    //   data.map((item) => {
    //     // const uId = rNum();
    //     if (item.id === rNum) {
    //       randomMath();
    //     } else { id = rNum; }
    //     return item;
    //   });
    //   return id;
    // };
    const newData = {
      id: data.length,
      name: newName || `User ${data.length + 1}`,
      active: false,
      avatar: ava,
    };
    setData([...data, newData]);
  };

  // const removeProfile = (id) => {
  //   if (data.length > 1) {
  //     const removeData = data.filter((item) => item.id !== id);
  //     setData(removeData);
  //   } else {
  //     console.log('No remove last acc');
  //   }
  //   // localStorage.setItem('default', JSON.stringify(data));
  // };

  const handleEdit = (idx, newName) => {
    const newData = data.map((item) => {
      if (item.id === idx) {
        item.name = newName;
        return item;
      }
      return item;
    });
    setData(newData);
  };

  const handleConfirm: React.MouseEventHandler = (idx?) => {
    if (edit) {
      const { value } = inputRef.current;
      handleEdit(idx, value);
      setEdit(false);
    } else {
      const { value } = inputRef.current;
      addUser(value);
      setVisiblePopup(false);
    }
  };
  const selectProfile = (idx) => {
    const newData = data.map((item) => {
      if (item.id === idx) {
        item.active = true;
        return item;
      }
      item.active = false;
      return item;
    });
    setData(newData);
  };

  const ContainerProfile = ({ item }) => {
    const wrapperRef = useRef(null);
    const [visible, setVisible] = useState(false);
    const { isOutside } = useOutsideClick(wrapperRef);

    useEffect(() => {
      if (isOutside) {
        setVisible(false);
      }
    }, [isOutside]);

    return (
      <>
        <Section variant="profile" key={item.id}>
          <Profile>
            <Button variant="icon" icon={avatar[item.avatar]} />
            <Name>{item.name}</Name>
            <Button onClick={() => selectProfile(item.id)} variant={item.active ? 'currentRole' : 'switch'}>
              {item.active ? 'Current role' : 'Switch'}
            </Button>
          </Profile>
          <Button
            className={style}
            variant="icon"
            icon={IconDropMenu}
            onClick={() => setVisible(true)}
            aria-hidden="true"
          />
          {visible && (
            <>
              <div className="wrapper" key={item.id} ref={wrapperRef}>
                <ul className="wrapperItems" aria-hidden="true">
                  <li>
                    <Button
                      className="btnProfile"
                      variant="linkDrop"
                      pallete="black"
                      icon={IconEdit}
                      onClick={() => {
                        setId(item.id);
                        setName(item.name);
                        setEdit(true);
                      }}
                    >
                      Edit profile
                    </Button>
                  </li>
                  {/* <li>
                    {data.length > 1 && (
                      <Button
                      // onClick={() => removeProfile(item.id)}
                      className="btnProfile"
                      variant="linkDrop"
                      pallete="black"
                      icon={IconRemove}
                      >
                      Remove profile
                      </Button>
                      )}
                    </li> */}
                </ul>
              </div>
              {visible && <div className={overlay} />}
            </>
          )}
        </Section>
      </>
    );
  };
  return (
    <>
      <Window title="Manage profiles">
        <ProfileComponent>
          {data && data.map((item) => <ContainerProfile item={item} key={item.id} />)}
        </ProfileComponent>
        <Button onClick={() => setVisiblePopup(true)}>Add new profile</Button>
      </Window>
      {edit ? (
        <Popup
          visible={edit}
          onCancel={() => setEdit(false)}
          title="Edit your name account"
          confirmButton={(
            <Button pallete="orange" onClick={() => handleConfirm(id)}>
              Edit
            </Button>
          )}
          footer
        >
          <Input
            ref={inputRef}
            maxLength={17}
            placeholder={`User ${data.length + 1}`}
            value={edit ? name : ''}
            onChange={(e) => setName(e.target.value)}
          />
        </Popup>
      ) : (
        <Popup
          visible={visiblePopup}
          onCancel={() => setVisiblePopup(false)}
          title="Enter your name account"
          confirmButton={(
            <Button pallete="orange" onClick={() => handleConfirm(id)}>
              Add user
            </Button>
          )}
          footer
        >
          <Input ref={inputRef} maxLength={17} placeholder={`User ${data.length + 1}`} />
        </Popup>
      )}
    </>
  );
}

export default Manage;
