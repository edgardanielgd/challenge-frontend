import "./../../styles/switch.css";

export default function SwitchButton({ options, currentValue, onChange }) {
    return (
        <div className="switch">
            {
                options.map((option, index) => (
                    <div key={option + index} className={option === currentValue ? "active" : ""} onClick={() => onChange(option)}>
                        {option}
                    </div>
                ))
            }
        </div >
    );
}