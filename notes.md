# Module Contents Breakdown

## `/src/config/constants.js`

- `distance` (500)
- `zoom` (3)
- `chickenSize` (15)
- `positionWidth` (42)
- `columns` (17)
- `boardWidth`
- `stepTime` (200)
- `laneTypes` array
- `laneSpeeds` array
- `vehicleColors` array
- `treeHeights` array

## `/src/config/controls.js`

- Key mappings (arrows)
- Button configurations
- Movement input validation

## `/src/core/scene.js`

- THREE.Scene initialization
- Scene object management
- Initial scene setup

## `/src/core/renderer.js`

- WebGLRenderer setup
- Shadow mapping configuration
- Render loop base

## `/src/core/camera.js`

- OrthographicCamera setup
- Camera position calculations
- Camera movement logic
- Initial camera positioning variables

## `/src/core/lighting.js`

- HemisphereLight setup
- DirectionalLight setup
- BackLight setup
- Light position calculations
- Shadow configuration

## `/src/objects/vehicles/car.js`

- Car mesh creation
- Car group assembly
- Police car specific styling
- Car dimensions

## `/src/objects/vehicles/truck.js`

- Truck mesh creation
- Truck group assembly
- Truck cargo components
- Truck dimensions

## `/src/objects/vehicles/wheel.js`

- Wheel mesh creation
- Wheel materials
- Wheel positioning helpers

## `/src/objects/environment/road.js`

- Road group creation
- Road section creation
- Road materials and textures
- Road positioning

## `/src/objects/environment/grass.js`

- Grass group creation
- Grass section creation
- Grass materials
- Grass positioning

## `/src/objects/environment/tree.js`

- Tree group creation
- Tree trunk and crown creation
- Tree positioning
- Random height selection

## `/src/objects/player/donut.js`

- Donut (former chicken) mesh creation
- Donut materials
- Donut animations
- Collision boundaries

## `/src/objects/lane.js`

- Lane type determination
- Lane object creation
- Vehicle placement in lanes
- Tree placement in lanes
- Lane movement logic

## `/src/utils/texture.js`

- Texture creation function
- Canvas texture generation
- Vehicle texture definitions
- Texture mapping utilities

## `/src/utils/collision.js`

- Collision detection algorithms
- Boundary calculations
- Hit testing functions
- Collision response

## `/src/utils/animation.js`

- Animation loop
- Delta time calculations
- Movement animations
- Jump animations

## `/src/managers/gameStateManager.js`

- Game state variables
- Game initialization
- State updates
- Game reset functionality

## `/src/managers/scoreManager.js`

- Score tracking
- Score updates
- High score management
- Counter DOM updates

## `/src/managers/movementManager.js`

- Movement calculations
- Position updates
- Movement validation
- Direction handling

## `/src/events/eventHandlers.js`

- Movement event handlers
- Click event handlers
- Keyboard event handlers
- Game state event handlers

## `/src/events/eventListeners.js`

- Event listener setup
- Event binding
- DOM element references
- Input initialization

## `/src/game.js`

- Game loop
- Core game mechanics
- Game initialization
- Main update logic

## `/src/index.js`

- Application entry point
- Initial setup
- Module imports
- Game instance creation

# Key Exports and Imports:

- Each module should export its main functionality
- Modules should import only what they need
- Constants should be imported from constants.js
- Event handlers should be imported into eventListeners.js
- All game objects should be imported into game.js

# State Management:

- Game state should be centralized in gameStateManager
- Components should subscribe to state changes
- State updates should trigger appropriate renders
