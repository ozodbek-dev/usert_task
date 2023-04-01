
import { Input } from 'antd';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { searchProd } from '../features/prod/prod.slice';
import { useState } from 'react';
import { ProdType } from '../pages/ProdsList';

const { Search } = Input;

const GlobalSearch: React.FC = () => {
  const dispatch = useAppDispatch()
  const {loading,prods} = useAppSelector(state=>state.prods);

  const [text,setText]  = useState("")
  const handleSearch = (e:any)=>{
    setText(e.target.value)
    const fillteredProds = e.target.value 
    ? prods
    .filter((p:ProdType)=>p
    .name.trim()
    .toLowerCase()
    .includes(e.target.value.trim().toLowerCase()))
    .sort((a:any, b:any) => {
      const aIndex = a.name.toLowerCase().indexOf(e.target.value.toLowerCase()); // getting index of searched text
      const bIndex = b.name.toLowerCase().indexOf(e.target.value.toLowerCase());//getting index of searched text
      console.log(aIndex,bIndex);
      console.log(aIndex-bIndex)
      return aIndex - bIndex; // this is for searching
    })
    :
    prods;
      dispatch(searchProd(fillteredProds))
  }

  return <div className='search'>
    <Search placeholder="Search Product..." enterButton="Search" size="large" loading={loading} value={text} onChange={handleSearch} />
  </div>
};

export default GlobalSearch;