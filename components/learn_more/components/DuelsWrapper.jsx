import React from "react";

const DuelsWrapper = ({ duelTitle }) => {
    return (
        <div className="mt-16 wrapper-gradient px-6 py-10 rounded-xl">
            <h2 className="text-center text-white font-normal text-2xl mb-8">{duelTitle}</h2>

            <div className="flex gap-3 flex-wrap justify-center">
                <div className="bg-white px-3 rounded-lg md:w-[148px] w-full h-[148px] flex flex-col items-center justify-start py-5 cursor-pointer hover:bg-slate-200 transition-all">
                    <p className="font-medium text-[##5F5F5F] text-[14px] mb-4">Most Importance</p>
                    <p className="font-medium text-[#000] text-[32px]">1</p>
                </div>
                <div className="bg-white px-3 rounded-lg md:w-[148px] w-full h-[148px] flex flex-col items-center justify-start py-5 cursor-pointer hover:bg-slate-200 transition-all">
                    <p className="font-medium text-[##5F5F5F] text-[14px] mb-4">Least Importance</p>
                    <p className="font-medium text-[#000] text-[32px]">9</p>
                </div>
            </div>
        </div>
    );
};

export default DuelsWrapper;
