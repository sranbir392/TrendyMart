import React, { useEffect, useState } from "react";
import MensProductCard from "../../components/ujjwal/MensProductCard";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Grid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import SideBar from "../../components/ujjwal/SideBar";
import { useLocation, useSearchParams } from "react-router-dom";
import { BsFillFilterSquareFill } from "react-icons/bs";

const MensShorts = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  // console.log("locayion", location.search);
  const [data, setdata] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement, setPlacement] = useState("left");
  const order = searchParams.getAll("order")[0];

  const getData = (params) => {
    axios
      .get("https://courageous-tuxedo-dog.cyclic.app/products", params)
      .then((res) => {
        console.log(res.data);
        setdata(res.data);
      });
  };
//useeffect for rerendering
  useEffect(() => {
    const price = searchParams.getAll("price")[0];
    const paramObj = {
      params: {
        category: searchParams.getAll("category"),
        _sort: order && "price",
        _order: order,
        maxprice:price
      },
    };
    getData(paramObj);
  }, [location.search]);

  // console.log(data);
  // position: fixed;
  // bottom: 0;
  // right: 0;
  // width: 300px;
  return (
    <div style={{ display: "flex",gap:"5px",padding:"0px 15px"}}>
      <Box  position="relative" width="25%"  display={{ base: "none", lg: "block" }}>
        <Box display={{ base: "none", lg: "block" }}  position="sticky" top="138px" left="20px" width="100%">
        <Box width="100%" display={{ base: "none", lg: "block" }}  >
          <SideBar />
        </Box>
      </Box>
     
      </Box>
      
      <Box width={{lg:"75%",base:"100%"}} pb="10px" pt="7px" >
         <Box  display={{ base: "flex", lg: "none"}}  width="100%" mb="10px" alignItems="center" >
        <BsFillFilterSquareFill
          onClick={onOpen}
          fontSize={23}
          color="#E40046"
          
        />
        <Text fontSize="xl" ml="10px" fontWeight={700}>Filter</Text>
        
        <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">Filter</DrawerHeader>
            <DrawerBody>
              {" "}
              <SideBar />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom:"30px",
            
          }}
        >
          <Box fontSize="20px" >Products (1-60 of 846 Items)</Box>
          <Box display={{lg:"flex",base:"none"}}>
            <div style={{display:"flex",alignItems:"center"}} >
              <label style={{ fontWeight: "bolder",marginRight:"7px" }}>Sort By:</label>
              <select name="cars" id="cars">
                <option value="volvo">Featured</option>
                <option value="saab">New Arrival</option>
                <option value="mercedes">Best Sellers</option>
                <option value="audi">Price(high-low)</option>
                <option value="audi">Price(low-high)</option>
              </select>
            </div>
            <div style={{display:"flex",alignItems:"center",marginLeft:"20px"}}>
              <label style={{ fontWeight: "bolder",marginRight:"7px" }}>Page:</label>
              <select name="cars" id="cars">
                <option value="volvo">Featured</option>
                <option value="saab">New Arrival</option>
                <option value="mercedes">Best Sellers</option>
                <option value="audi">Price(high-low)</option>
                <option value="audi">Price(low-high)</option>
              </select>
            </div>
          </Box>
        </div>
        <div  >
          <Grid
            templateColumns={{
              base: `repeat(1,1fr)`,
              sm: `repeat(2,1fr)`,
              md: `repeat(3,1fr)`,
              lg: `repeat(4,1fr)`,
            }}
            margin={"auto"}
            gap={6}
          >
            {data?.map((el) => (
              <MensProductCard key={el.id} {...el} />
            ))}
          </Grid>
        </div>
      </Box> 
    </div>
  );
};

export default MensShorts;
