import React from "react";
import { useNavigate } from "react-router-dom";
import "../components/Characters.css"; // ✅ Ensure CSS is imported

// ✅ Import images dynamically
import KrishnaImage from "../pages/images/krishna.jpg";
import ChanakyaImage from "../pages/images/chanakya.jpg";
import BuddhaImage from "../pages/images/Buddha.jpg";
import VivekanandaImage from "../pages/images/Vivekananda.jpg";

const Characters = () => {
    const navigate = useNavigate();

    // ✅ Store character data with image path & display name
    const characters = [
        { name: "Krishna", displayName: "Krishna", image: KrishnaImage },
        { name: "Acharya Chanakya", displayName: "Acharya Chanakya", image: ChanakyaImage },
        { name: "Gautam Buddha", displayName: "Gautam Buddha", image: BuddhaImage },
        { name: "Swami Vivekananda", displayName: "Swami Vivekananda", image: VivekanandaImage },
    ];

    const handleChat = (character) => {
        console.log("Navigating with character:", character); // ✅ Debugging log
        navigate("/chatbot", { state: { character } });
    };
    

    return (
        <div className="characters-container">
            <h2>Select a Character</h2>
            <div className="character-list">
                {characters.map((char, index) => (
                    <div key={index} className="character-card" onClick={() => handleChat(char.name)}>
                        <img src={char.image} alt={char.displayName} /> {/* ✅ Use dynamic image */}
                        <h3>{char.displayName}</h3> {/* ✅ Display name updated */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Characters;
