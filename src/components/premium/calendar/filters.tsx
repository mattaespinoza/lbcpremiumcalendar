import format from "date-fns/format";
import { parse } from "date-fns";
import { ChevronDown } from "heroicons-react";
import React, {Fragment,useEffect,useState } from 'react';
import { Dialog, Disclosure, Menu, Popover, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const sortOptions = [
  { name: 'Most Popular', href: '#' },
  { name: 'Best Rating', href: '#' },
  { name: 'Newest', href: '#' },
]


function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}


interface Props {
  setCurrentFilters:any;
  CurrentFilters:any;


}


const holdfilters = [
  {
    id: 'event_type',
    name: 'Event Type',
    options: [
      { value: 'Networking', label: 'Networking',checked:false},
      { value: 'Educational', label: 'Educational',checked:false },
      { value: 'Combination', label: 'Combination',checked:false},
      { value: 'Other', label: 'Other',checked:false},

    ],
  },
  {
    id: 'group_type',
    name: 'Group Type',
    options: [
      { value: 'Dedicated Networking', label: 'Dedicated Networking',checked:false },
      { value: 'Resource/Gov/Edu', label: 'Resource/Gov/Edu',checked:false },
      { value: 'Business/Industry', label: 'Business/Industry',checked:false },
      { value: 'Chambers', label: 'Chambers',checked:false},

    ],
  },

]

const filters = [
  {
    id: 'event_type',
    name: 'Event Type',
    options: [
      { value: 'Networking', label: 'Networking',checked:false},
      { value: 'Educational', label: 'Educational',checked:false },
      { value: 'Combination', label: 'Combination',checked:false},
      { value: 'Other', label: 'Other',checked:false},

    ],
  },
  {
    id: 'group_type',
    name: 'Group Type',
    options: [
      { value: 'Dedicated Networking', label: 'Dedicated Networking',checked:false },
      { value: 'Resource/Gov/Edu', label: 'Resource/Gov/Edu',checked:false },
      { value: 'Business/Industry', label: 'Business/Industry',checked:false },
      { value: 'Chambers', label: 'Chambers',checked:false},

    ],
  },

]

  export default function Filters(props:any) 
    {
      const [AllFilters, setAllFilters] = useState<any[]>([])
      const [ResetFilters, setResetFilters] = useState<any[]>([])

      const [open, setOpen] = useState(false)
      var setCurrentFilters=props.setCurrentFilters

      var CurrentFilters=props.CurrentFilters
      function runFilterChange(name:any,value:any,type:any){
        var filter2 = AllFilters
        console.log(type)
        var typenum = filter2.findIndex(x => x.name ===type)
        var optionfilter=filter2[typenum].options.findIndex((x:any) => x.value ===name)

        filter2[typenum]['options'][optionfilter].checked = value 
        console.log(value)
        setAllFilters([...filter2])


      }
        useEffect(() => {


          setResetFilters([...holdfilters])

          setAllFilters([...filters])
        },[]);



        function runFilter(name:any,value:any,type:any){
          if(value == true ){
            
          var CFilter = CurrentFilters 
         CFilter.push({name:name,type:type})
          console.log(name,value)
        setCurrentFilters([...CFilter])          
        runFilterChange(name,value,type)
          }


          else if(value == false){
            var CFilter = CurrentFilters
            
            console.log(name)
           const index = CFilter.map((e:any) => e.name).indexOf(name);

            if (index > -1) { // only splice array when item is found
              CFilter.splice(index, 1); // 2nd parameter means remove one item only
            }
            setCurrentFilters([...CFilter])          
            runFilterChange(name,value,type)

          }


          else if(type=='Search' ){
              var CFilter = CurrentFilters
              var index = CFilter.findIndex((item:any)=> item.type === 'Search');
              if(index >=0){
                CFilter[index]['name']=name 
              }
              else{
                CFilter.push({name:name,type:type})

              }
              console.log(CFilter)
             setCurrentFilters([...CFilter])          
          



          }
            
          }

      return (
        <> 


           <div className=" inline-block ">
      {/* Mobile filter dialog */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 sm:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-litecalendarblue"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4">
                  {AllFilters.map((section:any,sectionIdx:any) => (
                    <Disclosure as="div" key={section.name} className="border-t border-gray-200 px-4 py-6">
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400">
                              <span className="font-medium text-gray-900">{section.name}</span>
                              <span className="ml-6 flex items-center">
                                <ChevronDownIcon
                                  className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform')}
                                  aria-hidden="true"
                                />
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              {section.options.map((option:any, optionIdx:any) => (
                                <div key={option.value} className="flex items-center">
                                  <input
                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    value={option.value}
                                    checked={option.checked} 
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-calendarblue focus:ring-litecalendarblue"
                                    onClick={(e:any)=>(runFilter(option.value, e.target.checked,section.name)) }

                                  />
                                  <label
                                    htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                    className="ml-3 text-sm text-gray-500"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                          {(sectionIdx == AllFilters.length-1 && CurrentFilters.length >0 ) &&(
                                <button className='mt-8 bg-litecalendarblue text-white p-2 ml-2 rounded-lg' onClick={()=>{setCurrentFilters([...[]]);setAllFilters([...ResetFilters]);console.log(ResetFilters)}} >Clear Filters</button>
                                )}
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:max-w-7xl lg:px-8">


        <section aria-labelledby="filter-heading" className="border-t border-gray-200 py-6">
          <h2 id="filter-heading" className="sr-only">
            Event filters
          </h2>

          <div className="flex items-center justify-between">
            <Menu as="div" className="relative inline-block text-left">
              <div>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {sortOptions.map((option:any) => (
                      <Menu.Item key={option}>
                        {({ active }) => (
                          <a
                            href={option.href}
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm font-medium text-gray-900'
                            )}
                          >
                            {option.name}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            <button
              type="button"
              className="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden"
              onClick={() => setOpen(true)}
            >
              Filters
            </button>

            <Popover.Group className="hidden sm:flex sm:items-baseline sm:space-x-4">
              {AllFilters.map((section:any, sectionIdx:any) => (
                <Popover
                  as="div"
                  key={section.name}
                  id={`desktop-menu-${sectionIdx}`}
                  className="relative inline-block text-left"
                >
                  <div>
                    <Popover.Button className="group inline-flex items-center justify-center text-base font-medium text-white hover:text-white p bg-calendarblue rounded-lg p-2">
                      <span>{section.name}</span>

                      <ChevronDownIcon
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    </Popover.Button>
                    {(sectionIdx == AllFilters.length-1 && CurrentFilters.length >0 ) &&(
                    <button className='bg-litecalendarblue text-white p-2 ml-2 rounded-lg' onClick={()=>{setCurrentFilters([...[]]);setAllFilters([...ResetFilters]);console.log(ResetFilters)}} >Clear Filters</button>
                    )}
                  </div>
                  
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Popover.Panel className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <form className="space-y-4">
                        {section.options.map((option:any, optionIdx:any) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              id={`filter-${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              value={option.value}
                              checked={option.checked} 
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-calendarblue focus:ring-litecalendarblue"
                              onClick={(e:any)=>(runFilter(option.value, e.target.checked,section.name)) }
                            />
                            <label
                              htmlFor={`filter-${section.id}-${optionIdx}`}
                              className="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </form>
                    </Popover.Panel>
                  </Transition>
                </Popover>
              ))}
            </Popover.Group>
             <div className="ml-4 inline-block"><label>Title Search:</label> <input onChange={(e:any)=>(runFilter(e.target.value,'Search','Search'))} className='w-24 lg:w-40' type='text'/></div> 
          </div>
        </section> 
      </div>
    </div>
      </>

      );
    }