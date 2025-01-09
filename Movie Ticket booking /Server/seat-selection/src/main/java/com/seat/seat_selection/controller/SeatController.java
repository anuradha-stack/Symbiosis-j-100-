
package com.seat.seat_selection.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.seat.seat_selection.entity.Seat;
import com.seat.seat_selection.repository.SeatRepository;

@RestController
@RequestMapping("/api/seats")
@CrossOrigin(origins = "http://localhost:4200")
public class SeatController {

	@Autowired
	private SeatRepository seatrepository;
	private List<Seat> seatingChart = new ArrayList<>();
	private Long idCounter = 1L; // Simple counter for generating unique IDs

	// Constructor to initialize some sample seats
	public SeatController() {
		String[] seatTypes = { "Recliner", "Prime", "Classic" };
		for (char row = 'A'; row <= 'i'; row++) {
			for (int i = 1; i <= 5; i++) {
				Seat seat = new Seat(idCounter++, String.valueOf(row), row + String.valueOf(i),
						seatTypes[(i - 1) % seatTypes.length], "available");
				seatingChart.add(seat);
			}
		}
	}
	@GetMapping
	public List<Seat> getAllSeats(){
		return seatrepository.findAll();
	}
	// Get all available seats
	@GetMapping("selected-seat")
	public List<Seat> getAvailableSeats() {
		List<Seat> availableSeats = new ArrayList<>();
		for (Seat seat : seatingChart) {
			if ("available".equals(seat.getStatus())) {
				availableSeats.add(seat);
			}
		}
		return availableSeats;
	}
 
	
	// Get seat by ID
	@GetMapping("/{id}")
	public Seat getSeatById(@PathVariable Long id) {
		return seatingChart.stream().filter(seat -> seat.getId().equals(id)).findFirst().orElse(null); // Return null if
																										// not found
	}

	// Book a seat by ID
	@GetMapping("/book/{id}")
	public String bookSeat(@PathVariable Long id) {
		Optional<Seat> seatOpt = seatingChart.stream().filter(seat -> seat.getId().equals(id)).findFirst();

		if (seatOpt.isPresent()) {
			Seat seat = seatOpt.get();
			if ("available".equals(seat.getStatus())) {
				seat.setStatus("booked");
				return "Seat " + seat.getSeatName() + " successfully booked.";
			} else {
				return "Seat " + seat.getSeatName() + " is already booked.";
			}
		} else {
			return "Seat not found.";
		}
	}

	// Cancel booking for a seat by ID
	@GetMapping("/cancel/{id}")
	public String cancelSeat(@PathVariable Long id) {
		Optional<Seat> seatOpt = seatingChart.stream().filter(seat -> seat.getId().equals(id)).findFirst();

		if (seatOpt.isPresent()) {
			Seat seat = seatOpt.get();
			if ("booked".equals(seat.getStatus())) {
				seat.setStatus("available");
				return "Seat " + seat.getSeatName() + " booking canceled.";
			} else {
				return "Seat " + seat.getSeatName() + " is not booked.";
			}
		} else {
			return "Seat not found.";
		}
	}

	// Auto-select available seats based on a number
	@GetMapping("/autoSelect/{totalSeats}")
	public List<Seat> autoSelectSeats(@PathVariable int totalSeats) {
		List<Seat> availableSeats = getAvailableSeats();
		if (availableSeats.size() < totalSeats) {
			return availableSeats; // Not enough seats available, return all available seats
		}
		List<Seat> selectedSeats = availableSeats.subList(0, totalSeats);
		for (Seat seat : selectedSeats) {
			seat.setStatus("selected");
		}
		return selectedSeats;
	}

	// Update seat details by ID
	@PutMapping("/{id}")
	public String updateSeat(@PathVariable Long id, @RequestBody Seat updatedSeat) {
		Optional<Seat> seatOpt = seatingChart.stream().filter(seat -> seat.getId().equals(id)).findFirst();

		if (seatOpt.isPresent()) {
			Seat seat = seatOpt.get();
			seat.setRowName(updatedSeat.getRowName());
			seat.setSeatName(updatedSeat.getSeatName());
			seat.setSeatType(updatedSeat.getSeatType());
			seat.setStatus(updatedSeat.getStatus());
			return "Seat " + seat.getSeatName() + " updated successfully.";
		} else {
			return "Seat not found.";
		}
	}


	// Delete seat by ID
	@DeleteMapping("/{id}")
	 public void deleteSeat(@PathVariable Long id) {
		seatrepository.deleteById(id);
	}

	@PostMapping("/add")
	public String addSeat(@RequestBody Seat newSeat) {
		System.out.println(newSeat.getSeatType());
//		newSeat.setId(idCounter++);
		seatrepository.save(newSeat);
		
		return "Seat " + newSeat.getSeatName() + " added successfully.";
	}
}
