export default function CheckBox({ checked, onChange }) {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={onChange}
      />

      <div className="relative w-11 h-6 bg-gray-200 rounded-full peer 
                      peer-focus:ring-2 peer-focus:ring-gray-200 
                      peer-checked:bg-blue-600 
                      transition-all duration-300
                      
                      after:content-[''] 
                      after:absolute 
                      after:top-[2px] 
                      after:left-[2px] 
                      after:bg-white 
                      after:border-gray-300 
                      after:border 
                      after:rounded-full 
                      after:h-5 
                      after:w-5 
                      after:transition-all 
                      
                      peer-checked:after:translate-x-full 
                      peer-checked:after:border-white">
      </div>
    </label>
  );
}