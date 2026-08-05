# Extra Stops Pricing & Distance Calculation

This document explains the pricing logic and distance calculation methodology for "Extra Stops" (Custom Stoppages) in the IrelandGo booking system.

## 1. Distance Calculation (The Detour)
When a user adds a custom stop, the system calculates the extra driving distance required for the detour using a combination of the Haversine formula and a road-distance multiplier.

### Methodology:
1. **Straight-Line Distance:** The app uses the **Haversine formula** to calculate the straight-line distance between GPS coordinates using the Earth's radius (6,371 km).
2. **The Original Route:** It calculates the straight-line distance from `Pickup -> Dropoff`.
3. **The New Route:** It calculates the straight-line distance from `Pickup -> Extra Stop` plus `Extra Stop -> Dropoff`.
4. **The Detour:** It subtracts the Original Route distance from the New Route distance to find the extra straight-line detour distance.
5. **Road Multiplier:** The extra straight-line distance is multiplied by **`1.45`** to estimate realistic road driving conditions.

*Formula:*
`Extra Distance (km) = (New Route - Original Route) × 1.45`

---

## 2. Pricing Logic
The cost of an extra stop is calculated based on two factors: the extra distance (calculated above) and the duration (time spent) at the stop.

### Part A: Base Stop Price (First 60 Minutes)
For a standard stop duration of up to 60 minutes, the price covers the vehicle base fee plus the cost of the extra mileage.

**Formula:**
`Base Stop Price = Vehicle Base Fee + (Extra Distance in Km × €1.45)`

*(Note: The `Vehicle Base Fee` is pulled dynamically from the database based on the selected vehicle. If no base fee is found, €20 is used as a fallback).*

### Part B: Extra Time (Beyond 60 Minutes)
If the user chooses to spend more than 60 minutes at the stop, additional waiting time fees are applied on top of the Base Stop Price.

**Rates:**
- **Full Extra Hour (60 mins):** +€50
- **Partial Hour (1 to 44 mins):** +€30
- **Partial Hour (45 to 59 mins):** +€50

### Example Calculation
Assume a user selects a vehicle with a €20 Base Fee, adds an extra stop that creates a 10 km detour, and stays for 90 minutes.

1. **Base Price (60 mins):** €20 + (10 km × €1.45) = **€34.50** (Rounded to €35)
2. **Extra Time (30 mins):** Falls in the 1-44 min bracket = **€30**
3. **Total Stop Price:** €35 + €30 = **€65**
