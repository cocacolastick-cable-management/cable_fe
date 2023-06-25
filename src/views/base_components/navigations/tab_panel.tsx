import {ReactNode} from "react";

interface TabPanelProps {
   children?: ReactNode;
   index: number;
   value: number;
}

function TabPanel(props: TabPanelProps)
{
   const { children, value, index, ...other } = props;

   return (
      <div
         hidden={value !== index}
         aria-labelledby={`tab-${index}`}
         {...other}
         className={"h-full"}
      >
         {value === index && children}
      </div>
   );
}

export default TabPanel