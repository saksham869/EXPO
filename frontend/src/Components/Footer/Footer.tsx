// import { IconAnchor, IconBrandFacebook, IconBrandInstagram, IconBrandTelegram, IconBrandX, IconBrandYoutube } from "@tabler/icons-react";
// import { footerLinks } from "../../Data/Data";
// import { useLocation } from "react-router-dom";
// import { Divider } from "@mantine/core";

// const Footer = () => {
//     const location=useLocation();
//     return location.pathname!='/signup' && location.pathname!='/login'?<div className="flex flex-col gap-2"><div className="pt-20 pb-5 bg-mine-shaft-950 p-4  flex gap-8 justify-around flex-wrap">
//         <div data-aos="fade-up"  data-aos-offset="0"  className="w-1/4 sm-mx:w-1/3   xs-mx:w-1/2 xsm-mx:w-full flex flex-col gap-4">
//             <div className="flex gap-1 items-center text-bright-sun-400">
//                 <IconAnchor className="h-6 w-6" stroke={2.5} />
//                 <div className="text-xl font-semibold">JobHook</div>
//             </div>
//             <div className="text-sm text-mine-shaft-300">Humara Job Portal ek Trusted platform hai jo Job aur employers ko efficiently connect karta hai hamre services me include Job Serchnig Resume upload Rating & Review Interview Scheduling.</div>
//             <div className="flex gap-3 text-bright-sun-400 [&>a]:bg-mine-shaft-900 [&>a]:p-2 [&>a]:rounded-full [&>a]:cursor-pointer hover:[&>a]:bg-mine-shaft-700">
//                 <a href="#"><IconBrandInstagram /></a>
//                 <a href="#"><IconBrandTelegram /></a>
//                 <a href="#"><IconBrandYoutube /></a>
//             </div>
//         </div>
//         {
//             footerLinks.map((item, index) => <div  data-aos-offset="0"  data-aos="fade-up" key={index}>
//                 <div className="text-lg font-semibold mb-4 text-bright-sun-400">{item.title}</div>
//                 {
//                     item.links.map((link, index) => <div key={index} className="text-mine-shaft-300 text-sm hover:text-bright-sun-400 cursor-pointer mb-1 hover:translate-x-2 transition duration-300 ease-in-out">{link}</div>)
//                 }
//             </div>)
//         }
//     </div>
//     <Divider/>
//     <div data-aos="flip-left"  data-aos-offset="0" className="font-medium text-center p-5">
//         Designed & Developed By <a className="text-bright-sun-400 hover:underline font-semibold " href="https://github.com/Code-Mars">Team Expora</a>
//     </div>
//     </div>:<></>
// }
// export default Footer;
import { IconAnchor, IconBrandInstagram, IconBrandTelegram, IconBrandYoutube } from "@tabler/icons-react";
import { footerLinks } from "../../Data/Data";
import { useLocation } from "react-router-dom";
import { Divider } from "@mantine/core";

const Footer = () => {
  const location = useLocation();

  if (location.pathname === "/signup" || location.pathname === "/login") return null;

  return (
    <div className="flex flex-col gap-2">
      {/* Main Footer */}
      <div className="pt-20 pb-5 bg-mine-shaft-950 p-4 flex gap-8 justify-around flex-wrap">
        {/* Brand & Description */}
        <div data-aos="fade-up" data-aos-offset="0" className="w-1/4 sm-mx:w-1/3 xs-mx:w-1/2 xsm-mx:w-full flex flex-col gap-4">
          <div className="flex gap-1 items-center text-bright-sun-400">
            <IconAnchor className="h-6 w-6" stroke={2.5} />
            <div className="text-xl font-semibold">Expora</div>
          </div>
          <div className="text-sm text-mine-shaft-300">
            Humara Job Portal ek trusted platform hai jo Job seekers aur employers ko efficiently connect karta hai. Hamare services me include hai: Job Searching, Resume Upload, Rating & Review, Interview Scheduling.
          </div>
          <div className="flex gap-3 text-bright-sun-400 [&>a]:bg-mine-shaft-900 [&>a]:p-2 [&>a]:rounded-full [&>a]:cursor-pointer hover:[&>a]:bg-mine-shaft-700">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><IconBrandInstagram /></a>
            <a href="https://telegram.org" target="_blank" rel="noopener noreferrer"><IconBrandTelegram /></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><IconBrandYoutube /></a>
          </div>
        </div>

        {/* Footer Links */}
        {footerLinks.map((item, index) => (
          <div data-aos="fade-up" data-aos-offset="0" key={index}>
            <div className="text-lg font-semibold mb-4 text-bright-sun-400">{item.title}</div>
            {item.links.map((link, linkIndex) => (
              <div
                key={linkIndex}
                className="text-mine-shaft-300 text-sm hover:text-bright-sun-400 cursor-pointer mb-1 hover:translate-x-2 transition duration-300 ease-in-out"
              >
                {link}
              </div>
            ))}
          </div>
        ))}
      </div>

      <Divider />

      {/* Footer Bottom */}
      <div data-aos="flip-left" data-aos-offset="0" className="font-medium text-center p-5">
        Designed & Developed By{" "}
        <a
          className="text-bright-sun-400 hover:underline font-semibold"
          href="https://github.com/Code-Mars"
          target="_blank"
          rel="noopener noreferrer"
        >
          Team Expora
        </a>
      </div>
    </div>
  );
};

export default Footer;
