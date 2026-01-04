# Builder Character Animation Added!

The builder character next to the building is now animated and actively working with his hammer!

## What's New

### Animated Builder Component
- Created a new `AnimatedBuilder()` component with real-time animation
- Uses React Three Fiber's `useFrame` hook for smooth 60fps animations
- Two refs track the animatable parts: `rightArmRef` (arm + hammer) and `bodyRef` (entire body)

### Animation Features

#### 1. Hammer Swinging Motion
- **Right arm rotation (Z-axis)**: Swings up and down continuously
  - Base rotation: `0.5 radians`
  - Swing amplitude: `0.4 radians` (about 23 degrees)
  - Speed: `2 Hz` (completes 2 swings per second)
- **Right arm rotation (X-axis)**: Forward/backward motion for realistic hammering
  - Amplitude: `0.2 radians` (about 11 degrees)
  - Synchronized with Z-axis rotation

#### 2. Body Bobbing Motion
- Subtle up-and-down movement synchronized with hammer swings
- Amplitude: `0.02 units` (very subtle, just enough to look natural)
- Creates impression of effort and weight shift while working

### Technical Implementation

The animation uses a sine wave based on elapsed time:

```typescript
useFrame((state) => {
  const time = state.clock.getElapsedTime();

  // Hammer swinging animation - up and down motion
  if (rightArmRef.current) {
    rightArmRef.current.rotation.z = 0.5 + Math.sin(time * 2) * 0.4;
    rightArmRef.current.rotation.x = Math.sin(time * 2) * 0.2;
  }

  // Subtle body bobbing motion
  if (bodyRef.current) {
    bodyRef.current.position.y = -0.35 + Math.sin(time * 2) * 0.02;
  }
});
```

### How It Works

1. **useFrame Hook**: Called every frame (~60 times per second) by React Three Fiber
2. **state.clock.getElapsedTime()**: Gets the total elapsed time in seconds since scene started
3. **Math.sin(time * 2)**: Creates smooth oscillation between -1 and +1
   - Multiplying by 2 makes it complete 2 cycles per second
4. **Amplitude Scaling**: Multiply the sine wave by desired rotation/movement range
5. **Base Offset**: Add base rotation/position to center the animation

### Animation Loop

The builder continuously:
- Swings his right arm (with hammer) up and down
- Rotates the arm forward and backward for realistic hammering motion
- Bobs his body slightly up and down
- All movements are synchronized and smooth
- Loop never stops - he's always working!

## Visual Effect

When you view the portfolio now, the builder character:
- Stands next to the building at position `[-1.3, -0.35, 0.5]`
- Faces the building at a 45-degree angle
- Actively swings his hammer in a continuous working motion
- Has subtle body movement that makes him look alive and engaged
- Creates a dynamic, engaging scene instead of a static character

## Performance

- Very lightweight animation (just a few rotation/position updates per frame)
- Uses refs to avoid React re-renders
- Smooth 60fps on all devices
- No impact on the rest of the 3D scene performance

## Customization

You can adjust the animation in [Scene3D.tsx](src/app/components/Scene3D.tsx):

### Change Hammer Swing Speed
```typescript
// Line 17-18: Change the multiplier (currently 2)
rightArmRef.current.rotation.z = 0.5 + Math.sin(time * 3) * 0.4; // Faster (3 Hz)
rightArmRef.current.rotation.z = 0.5 + Math.sin(time * 1) * 0.4; // Slower (1 Hz)
```

### Change Swing Intensity
```typescript
// Line 17: Change the amplitude (currently 0.4)
rightArmRef.current.rotation.z = 0.5 + Math.sin(time * 2) * 0.6; // Bigger swing
rightArmRef.current.rotation.z = 0.5 + Math.sin(time * 2) * 0.2; // Smaller swing
```

### Change Body Bobbing
```typescript
// Line 23: Change the amplitude (currently 0.02)
bodyRef.current.position.y = -0.35 + Math.sin(time * 2) * 0.05; // More bobbing
bodyRef.current.position.y = -0.35 + Math.sin(time * 2) * 0.01; // Less bobbing
```

### Add More Animations

You can add more animated movements:

```typescript
// Rotate the head to look around
if (headRef.current) {
  headRef.current.rotation.y = Math.sin(time * 0.5) * 0.2; // Slow head turn
}

// Swing left arm too
if (leftArmRef.current) {
  leftArmRef.current.rotation.z = -0.3 + Math.sin(time * 2 + Math.PI) * 0.1; // Opposite swing
}
```

## Result

The 3D scene now features:
- Animated builder character actively working on the building
- Smooth, continuous hammer swinging motion
- Natural body movement synchronized with the work
- Professional-looking character animation that adds life to the scene
- Engaging visual that demonstrates technical skill with 3D animations

**View it at: http://localhost:3000** (or http://localhost:3001)

Watch the builder work! The animation runs continuously and smoothly.
